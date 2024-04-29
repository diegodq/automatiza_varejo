import fs from 'fs';
import path from 'path';
import PdfPrinter from 'pdfmake';
import os from 'os';
import AdmZip from 'adm-zip';
import convertUserIdInCompanyId from '../../utils/convertUserIdInCompanyId';
import appDataSource from '../../data-source';
import paramsConfig from '../../params/paramsConfig';
import { BadRequestError } from '../../utils/ApiErrors';

class CreateQuestionAndAnswersReports {
  public async execute(data: any, id: number): Promise<string[]>
	{
		const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };

		let hasFirstImage = false;
		for (const array of data)
		{
			for (const img of array)
			{
				if (Object.prototype.hasOwnProperty.call(img,'image')) {
					hasFirstImage = true;
					break;
				}

				if (hasFirstImage) break;
			}
		}

		let paths: string[] = []
		if (!hasFirstImage) {
			paths = [
				(os.platform() == 'win32') ? 'images-report\\' : 'images-report/'
			];
		} else {
			paths = [
				(os.platform() == 'win32') ? 'companyLogo\\' : 'companyLogo/',
				(os.platform() == 'win32') ? 'images-report\\' : 'images-report/'
			];
		}

    const pdfPromises: Promise<string>[] = [];

    for (const arrayObject of data)
		{
      const images = [];
      let pathIndexAcutal = 0;

      for (const img of arrayObject)
			{
        if (Object.prototype.hasOwnProperty.call(img,'image')) {
          images.push(img.image);
          img.image = path.resolve(__dirname, '..', '..', `${paths[pathIndexAcutal]}` + img.image);
          pathIndexAcutal = (pathIndexAcutal + 1) % paths.length;
        }
      }

      const printer = new PdfPrinter(fonts);

			const pdfDoc = printer.createPdfKitDocument({
        defaultStyle: { font: 'Helvetica' },
        pageMargins: [60, 60, 0, 100],
        background: [
					{
						image: path.resolve(__dirname, '..', '..', 'images-report', 'background.jpg'),
						fit: [595, 842]
					}
        ],
        content: arrayObject,
        footer: function (currentPage: { toString: () => string; }, pageCount: number) {
          return {
            columns: [
              { text: 'Página ' + currentPage.toString() + ' de ' + pageCount.toString(), style: 'footerLeft' },
            ]
          };
        },
        styles: {
          company: {
            fontSize: 16,
            alignment: 'left',
            bold: true,
            margin: [0, 0, 30, 10],
            color: '#00000',
          },
          periodo: {
            fontSize: 12,
            alignment: 'left',
            margin: [0, 0, 0, 10],
            color: '#666',
          },
          horario_report: {
            fontSize: 12,
            alignment: 'left',
            margin: [0, 0, 0, 10],
            color: '#666',
          },
          store: {
            fontSize: 12,
            alignment: 'left',
            margin: [0, 0, 0, 10],
            color: '#666',
          },
          header: {
            fontSize: 16,
            alignment: 'center',
            bold: true,
            margin: [-50, 30, 0, 10],
            color: '#666',
          },
          tree: {
            fontSize: 14,
            bold: true,
            margin: [-50, 0, 0, 10],
            color: '#666',
          },
          noQuestionContainer: {
            fontSize: 20,
            bold: true,
            margin: [30, 60, 60, 60],
            color: '#666',
            alignment: 'center'
          },
          nps_score: {
            fontSize: 14,
            alignment: 'center',
            margin: [-50, 25, 0, 15],
            color: '#666',
          },
          employee: {
            fontSize: 12,
            alignment: 'center',
            margin: [0, -5, 50, 20],
            color: '#666',
          },
          question: {
            fontSize: 12,
            alignment: 'left',
            margin: [0, 10, 50, 5],
            color: '#333',
          },
          response: {
            fontSize: 12,
            alignment: 'left',
            bold: true,
            margin: [0, 0, 50, 15],
            color: 'black',
          },
          footerLeft: {
            fontSize: 12,
            margin: [0, 20, 0, 20],
            alignment: 'center',
            color: '#666',
          },
        }
      });

      const outputFilePath = path.resolve(__dirname, '..', '..', 'files',
				(paramsConfig.params.zipReports) ? `${await this.returnCNPJCompany(id)}_${Date.now()}.pdf` : `report_${Date.now()}.pdf`
			);

      const pdfPromise = new Promise<string>((resolve: (value: string | PromiseLike<string>) => void, reject: (reason?: any) => void): void => {
        pdfDoc.pipe(fs.createWriteStream(outputFilePath));
        pdfDoc.end();
        pdfDoc.on('end', () => resolve(outputFilePath));
        pdfDoc.on('error', reject);
      });

			pdfPromises.push( pdfPromise);
    }

		const generatedFiles: string[] = await Promise.all( pdfPromises);

		if(paramsConfig.params.zipReports && data.length > 1) {
			const zipName: string = await this.zipFiles(generatedFiles, await this.returnCNPJCompany(id));
			await this.removeLeftFilesGeneratedByZip(generatedFiles);

			let fileWithUrl;
			if(process.env.APP_MODE == 'development') fileWithUrl = `${process.env.BASE_URL + ':' + process.env.SERVER_PORT}/report/${zipName}`;
			else fileWithUrl = `${process.env.HTTPS_URL}/report/${zipName}`;

			return [fileWithUrl];
		}

		const fileWithUrl: string[] = generatedFiles.map(file => {
			const urlPart:string[] = (os.platform() == 'win32') ? file.split('\\') : file.split('/');
			const fileName: string = urlPart[urlPart.length - 1];

			if(process.env.APP_MODE == 'development') return `${process.env.BASE_URL + ':' + process.env.SERVER_PORT}/report/${fileName}`;
			else return `${process.env.HTTPS_URL}/report/${fileName}`;
		});

		return fileWithUrl;
  }

	private async returnCNPJCompany(idCompany: number): Promise<string>
	{
		const id = await convertUserIdInCompanyId(idCompany);

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select cnpj from company where id = ?;`, [id]);

		await queryRunner.release();

		let maskCNPJ = '';
		resultQuery.forEach((item: { cnpj: string }) => {
			maskCNPJ = item.cnpj;
		});

		const unmaskCNPJ = maskCNPJ.replace(/\D/g, '');
		return unmaskCNPJ;
	}

	private async zipFiles(nameFiles: string[], CNPJ: string): Promise<string>
	{
		const outputFilePath = path.resolve(__dirname, '..', '..', 'files', `${CNPJ}_${Date.now()}.zip`);

		const zip = new AdmZip();

		nameFiles.forEach(file => {
			zip.addLocalFile(file);
		});

		zip.writeZip(outputFilePath, (error: Error | null): void => {
			if (error) throw new BadRequestError('Erro to zip files');
		})

		const resultFile: string[] = outputFilePath.split((os.platform() == 'win32') ? '\\' : '/');
		const zipName: string = resultFile[resultFile.length - 1];

		return zipName;
	}

	private async removeLeftFilesGeneratedByZip(nameFiles: string[]): Promise<void>
	{
		try {
			nameFiles.forEach(file => {
				fs.unlinkSync(file);
			});
		} catch(error) {
			console.log(error);
		}
	}
}

export default CreateQuestionAndAnswersReports;

import fs from 'fs';
import path from 'path';
import PdfPrinter from 'pdfmake';

class CreateQuestionAndAnswersReports {
  public async execute(data: any): Promise<string[]>
	{
    const paths = [
    	'companyLogo\\',
    	'images-report\\'
    ];

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };

    const pdfPromises: Promise<string>[] = [];

    for (const arrayObject of data)
		{
      const images = [];
      let pathIndexAcutal = 0;

      for (const img of arrayObject)
			{
        // eslint-disable-next-line no-prototype-builtins
        if (img.hasOwnProperty('image')) {
          images.push(img.image);
          img.image = path.resolve(__dirname, '..', '..', `${paths[pathIndexAcutal]}` + img.image);
          pathIndexAcutal = (pathIndexAcutal + 1) % paths.length;
        }
      }

      const printer = new PdfPrinter(fonts);

      const pdfDoc = printer.createPdfKitDocument({
        defaultStyle: { font: 'Helvetica' },
        pageMargins: [60, 40, 10, 60],
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
            margin: [0, 20, 30, 10],
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
            margin: [0, 0, 0, 0],
            color: '#666',
          },
          header: {
            fontSize: 16,
            alignment: 'center',
            bold: true,
            margin: [-50, 50, 0, 10],
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
          employee: {
            fontSize: 12,
            alignment: 'center',
            margin: [-50, 20, 0, 20],
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
            margin: [0, -30, 0, 20],
            alignment: 'center',
            color: '#666',
          },
        }
      });

      const outputFilePath = path.resolve(__dirname, '..', '..', 'files', `output_${Date.now()}.pdf`);
      const pdfPromise = new Promise<string>((resolve, reject) => {
        pdfDoc.pipe(fs.createWriteStream(outputFilePath));
        pdfDoc.end();
        pdfDoc.on('end', () => resolve(outputFilePath));
        pdfDoc.on('error', reject);
      });

      pdfPromises.push(pdfPromise);
    }

    return Promise.all(pdfPromises);
  }
}

export default CreateQuestionAndAnswersReports;

import PdfPrinter from "pdfmake";
import fs from 'fs';

class CreateQuestionAndAnswersReports
{
	public async execute(): Promise<string>
	{
		const fonts = {
			Helvetica: {
				normal: 'Helvetica',
				bold: 'Helvetica-Bold',
				italics: 'Helvetica-Oblique',
				bolditalics: 'Helvetica-BoldOblique'
			}
		};

		const printer = new PdfPrinter(fonts);

		const pdfDoc = printer.createPdfKitDocument({
			defaultStyle: {font: 'Helvetica'},
			content: [
				{ text: 'AUTOMATIZA SOLUÇÕES PARA O VAREJO LTDA', style: 'company' },
				{ text: 'Período: 18/03/2024 à 18/03/2024', style: 'periodo' },
				{ text: 'Pesquisa - 202403212T200208', style: 'header' },
				{ text: 'Negativa', style: 'tree' },
				{ text: 'Colaborador: GABRIEL', style: 'employee' },

				{ text: '1 - Em qual departamento você não teve uma boa experiência?', style: 'question' },
				{ text: 'Resposta: Depósito', style: 'response' },

				{ text: '2 - Em qual departamento você não teve uma boa experiência?', style: 'question' },
				{ text: 'Resposta: Atendimento ao Cliente', style: 'response' },

				{ text: '3 - Nos dê oportunidade de melhorar! Conte-nos com suas palavras, hora é agora.', style: 'question' },
				{ text: 'Resposta: Teste', style: 'response' },

				{ text: '4 - Voltaria comprar conosco em uma nova oportunidade?', style: 'question' },
				{ text: 'Resposta: Se melhorar sim', style: 'response' }
			],
			footer: function(currentPage, pageCount) {
				return { text: 'Página ' + currentPage.toString() + ' de ' + pageCount, style: 'footer' };
			},
			styles: {
				company: {
					fontSize: 11,
					alignment: 'left',
					bold: true,
					margin: [0, 0, 0, 10],
				},
				periodo: {
					fontSize: 9,
					alignment: 'left',
					bold: true,
					margin: [0, 0, 0, 10],
				},
				header: {
					fontSize: 11,
					alignment: 'center',
					bold: true,
					margin: [0, 0, 0, 10],
				},
				tree: {
					fontSize: 8,
					alignment: 'center',
					bold: true,
					margin: [0, 0, 0, 10],
				},
				date: {
					fontSize: 9,
					alignment: 'center',
					bold: true,
					margin: [0, 0, 0, 10],
				},
				employee: {
					fontSize: 7,
					alignment: 'center',
					bold: true,
					margin: [0, 0, 0, 10],
				},
				question:{
					fontSize: 7,
					alignment: 'left',
					margin: [0, 0, 0, 10],
				},
				response: {
					fontSize: 7,
					alignment: 'left',
					bold: true,
					margin: [0, 0, 0, 10],
				},
				footer: {
					fontSize: 10,
					margin: [0, 10, 0, 10],
					alignment: 'right'
				},
			}
		});

		pdfDoc.pipe(fs.createWriteStream("/home/dsousa/projects/automatiza_varejo/src/files/output.pdf"));
		pdfDoc.end();
		return 'pdf done';
	}
}

export default CreateQuestionAndAnswersReports;
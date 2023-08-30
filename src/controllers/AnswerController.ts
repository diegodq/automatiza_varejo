import { Request, Response } from "express";
import CreateAnswerService from "../services/answer/CreateAnswerService";
import EditAnswerService from "../services/answer/EditAnswerService";
import ListAnswersService from "../services/answer/ListAnswersService";
import ListAnswerService from "../services/answer/ListAnswerService";
import RemoveAnswerService from "../services/answer/RemoveAnswerService";
import ListResearchService from "../services/answer/ListResearchService";
import answerRepository from "src/repositories/answerRepository";
import fs from 'fs';
import path from "path";

import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

class AnswerController
{
	static async add(request: Request, response: Response): Promise<Response>
	{
		const answers = request.body;

		const createAnswerService = new CreateAnswerService();
		const answerCreated = await createAnswerService.execute( answers );

		return response.status(200).json({ status: 'success', message: answerCreated });
	}

	static async edit(request: Request, response: Response): Promise<Response>
	{
		const { id, answer, client_name, client_phone } = request.body;

		const editAnswerService = new EditAnswerService();
		const answerEdited = await editAnswerService.execute({ id, answer, client_name, client_phone });

		return response.status(200).json({ status: 'success', message: answerEdited });
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const listAnswerService = new ListAnswerService();
		const answer = await listAnswerService.execute({ id });

		return response.status(200).json({ status: 'success', answer });
	}

	static async listAll(request: Request, response: Response): Promise<Response>
	{
		const company_id = request.userId;

		const { from, to } = request.params;

		const listAnswersService = new ListAnswersService();
		if(typeof from === 'undefined' && typeof to === 'undefined') {
			const listAnswers = await listAnswersService.optionalExecute({ company_id });

			return response.status(200).json({ status: 'success', listAnswers });
		} else {
			const listAnswers = await listAnswersService.execute({ company_id, from, to });

			return response.status(200).json({ status: 'success', listAnswers });
		}
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const removeAnswerService = new RemoveAnswerService();
		const answerRemoved = await removeAnswerService.execute({ id });

		return response.status(200).json({ status: 'success', message: answerRemoved });
	}

	static async listResearch(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const { from, to } = request.params;

		const listResearchService = new ListResearchService();
		if(typeof from === 'undefined' && typeof to === 'undefined') {
			const research = await listResearchService.optionalExecute({ company });

			return response.status(200).json({ research });
		} else {
			const research = await listResearchService.execute({ company, from, to });

			return response.status(200).json({ research });
		}
	}

	static async makeReport(request: Request, response: Response)
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
		const docDefinitions: TDocumentDefinitions = {
			defaultStyle: { font: 'Helvetica' },
			content: [
				{text: `Relatório perguntas e respostas\n\n`, style: 'titleReport'},
				{text: `Empresa: Nome da empresa - CNPJ: 36.185.301/0001-84\n`, style: 'infoCompany'},
				{text: `Período: 20/08/2023 - 20/08/2023\n`, style: 'period'},
				{text: `Data impressão: 20/08/2023\n`, style: 'printDate'},
				{text: `Total perguntas: 40\n`, style: 'totalQuestion'},
				{text: `Total respostas: 40\n\n`, style: 'totalAnswer'},
				{
					table: {
						headerRows: 1,
						widths: ['*', '*', '*', '*', '*'],
						body: [
							[{text: 'Pergunta', style: 'tableHeader'},
							{text: 'Resposta', style: 'tableHeader'},
							{text: 'Cliente', style: 'tableHeader'},
							{text: 'Telefone', style: 'tableHeader'},
							{text: 'Funcionário', style: 'tableHeader'}],

							[{text: 'O que você achou?', style: 'tableRow'},
							{text: 'Eu acho que isso é', style: 'tableRow'},
							{text: 'Rodrigo', style: 'tableRow'},{text: '61996778575', style: 'tableRow'},
							{text: 'Deivid', style: 'tableRow'}],

							[{text: 'O que você achou?', style: 'tableRow'},
							{text: 'Eu acho que isso é', style: 'tableRow'},
							{text: 'Rodrigo', style: 'tableRow'},{text: '61996778575', style: 'tableRow'},
							{text: 'Deivid', style: 'tableRow'}],

							[{text: 'O que você achou?', style: 'tableRow'},
							{text: 'Eu acho que isso é', style: 'tableRow'},
							{text: 'Rodrigo', style: 'tableRow'},{text: '61996778575', style: 'tableRow'},
							{text: 'Deivid', style: 'tableRow'}],

							[{text: 'O que você achou?', style: 'tableRow'},
							{text: 'Eu acho que isso é', style: 'tableRow'},
							{text: 'Rodrigo', style: 'tableRow'},{text: '61996778575', style: 'tableRow'},
							{text: 'Deivid', style: 'tableRow'}]
						]
					},
					layout: 'lightHorizontalLines'
				},
			],
			styles: {
				titleReport: {
					fontSize: 10,
					bold: true,
					alignment: "center"
				},
				tableHeader: {
					fontSize: 9,
					bold: true
				},
				infoCompany: {
					fontSize: 9,
				},
				period: {
					fontSize: 9,
				},
				printDate: {
					fontSize: 9,
				},
				totalQuestion: {
					fontSize: 9,
				},
				totalAnswer: {
					fontSize: 9,
				},
				tableRow: {
					fontSize: 9
				}
			}
		}
		const pdfDoc = printer.createPdfKitDocument(docDefinitions);

		//pdfDoc.pipe(fs.createWriteStream(path.join(__dirname, '..', '/reports/report.pdf')));

		const chunks: any = [];
		pdfDoc.on("data", (chunk) => {
			chunks.push(chunk);
		});

		pdfDoc.end();

		pdfDoc.on("end", () => {
			const result = Buffer.concat(chunks);
			response.end(result);
		});
	}
}

export default AnswerController;
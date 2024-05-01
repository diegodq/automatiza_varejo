import { Request, Response } from "express";
import CreateAnswerService from "../services/answer/CreateAnswerService";
import ListAnswersService from "../services/answer/ListAnswersService";
import ListAnswerService from "../services/answer/ListAnswerService";
import RemoveAnswerService from "../services/answer/RemoveAnswerService";
import ListResearchService from "../services/answer/ListResearchService";
import Answer from "../entities/Answer";
import ListQuestionBinaryService from '../services/question/ListQuestionBinaryService';
import Company from '../entities/Company';
import ListQuestionFlexService from "../services/question/ListQuestionFlexService";

class AnswerController
{
	static async add(request: Request, response: Response): Promise<Response>
	{
		const answers = request.body;

		const createAnswerService: CreateAnswerService = new CreateAnswerService();
		const answerCreated: string = await createAnswerService.execute( answers );

		return response.status(200).json({ status: 'success', message: answerCreated });
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const listAnswerService: ListAnswerService = new ListAnswerService();
		const answer: Answer | null = await listAnswerService.execute({ id });

		return response.status(200).json({ status: 'success', answer });
	}

	static async listAll(request: Request, response: Response): Promise<Response>
	{
		const company_id: string = request.userId;

		const { from, to, store } = request.params;

		const listAnswersService: ListAnswersService = new ListAnswersService();
		if(typeof from === 'undefined' && typeof to === 'undefined' && typeof store === 'undefined') {
			const listAnswers: Answer[] | null = await listAnswersService.optionalExecute({ company_id });

			return response.status(200).json({ status: 'success', listAnswers });
		} else {
			const listAnswers: Answer[] | null  = await listAnswersService.execute({ company_id, from, to, store });

			return response.status(200).json({ status: 'success', listAnswers });
		}
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const removeAnswerService: RemoveAnswerService = new RemoveAnswerService();
		const answerRemoved: string = await removeAnswerService.execute({ id });

		return response.status(200).json({ status: 'success', message: answerRemoved });
	}

	static async listResearch(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const { from, to, store } = request.params;

		const listResearchService: ListResearchService = new ListResearchService();
		if(typeof from === 'undefined' && typeof to === 'undefined' && typeof store === 'undefined') {
			const research: object = await listResearchService.optionalExecute({ company });

			return response.status(200).json({ research });
		} else {
			const research: object = await listResearchService.execute({ company, from, to, store });

			return response.status(200).json({ research });
		}
	}

	static async listQuestionsBinary(request: Request, response: Response): Promise<Response>
	{
		const company: Company = request.userId;

		const {from, to, id_store} = request.params;

		const listQuestionBinaryService: ListQuestionBinaryService = new ListQuestionBinaryService();
		const listBinary: object = await listQuestionBinaryService.execute({company, from, to, id_store});

		return response.status(200).json(listBinary);
	}

	static async listQuestionsFlex(request: Request, response: Response): Promise<Response>
	{
		const company: Company = request.userId;

		const {from, to, id_store} = request.params;

		const listQuestionFlexService: ListQuestionFlexService = new ListQuestionFlexService();
		const listBinaryFlex: object = await listQuestionFlexService.execute({company, from, to, id_store});

		return response.status(200).json(listBinaryFlex);
	}
}

export default AnswerController;
import { Request, Response } from "express";
//import CreateParamsQuestionService from "../services/paramsQuestions/CreateParamsQuestionService";
import Question from "../entities/Question";
import paramsQuestionRepository from "../repositories/paramsQuestionRepository";
import ListParamsByQuestionService from "../services/paramsQuestions/ListParamsByQuestionService";

type ParamsType =
{
	tree_question: number,
	option_one: string,
	option_two: string,
	import_type: string,
	position: number,
	mandatory_question: number,
	finish_research: number,
	question: Question;
}

class QuestionParamsController
{
	static async createParamsQuestion(request: Request, response: Response): Promise<Response>
	{
		const params = paramsQuestionRepository.create(request.body.map((item: ParamsType) => {
			return item
		}));

		const result = await paramsQuestionRepository.save(params);
		if(!result) {
			return response.status(400).json({ status: 'success', message: 'error-added-params' });
		}

		return response.status(200).json({ status: 'success', message: 'params-added' });
	}

	static async updateParamsQuestion(request: Request, response: Response): Promise<Response>
	{
		return response.status(200).json({ status: 'success', message: 'test' });
	}

	static async listParams(request: Request, response: Response): Promise<Response>
	{
		const { question_id } = request.body;
		console.log(question_id);

		const listParamsByQuestionService = new ListParamsByQuestionService();
		const listParams = await listParamsByQuestionService.execute({ question_id });

		return response.status(200).json({ status: 'success', listParams });
	}
}

export default QuestionParamsController;
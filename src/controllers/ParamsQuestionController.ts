import { Request, Response } from "express";
import CreateParamsQuestionService from "../services/paramsQuestions/CreateParamsQuestionService";
import paramsQuestionRepository from "../repositories/paramsQuestionRepository";
import ListParamsByQuestionService from "../services/paramsQuestions/ListParamsByQuestionService";
import UpdateBooleanParamsQuestionService from "../services/paramsQuestions/UpdateBooleanParamsQuestionService";


class QuestionParamsController
{
	static async createParamsQuestion(request: Request, response: Response): Promise<Response>
	{
		const params = paramsQuestionRepository.create(request.body.map((item: object) => {
			return item
		}));

		const createParamsQuestionService = new CreateParamsQuestionService();
		const paramsStored = await createParamsQuestionService.execute(params);

		return response.status(200).json({ status: 'success', message: paramsStored });
	}

	static async updateParamsQuestion(request: Request, response: Response): Promise<Response>
	{
		return response.status(200).json({ status: 'success', message: 'test' });
	}

	static async listParams(request: Request, response: Response): Promise<Response>
	{
		const { question_id } = request.params;

		const listParamsByQuestionService = new ListParamsByQuestionService();
		const listParams = await listParamsByQuestionService.execute({ question_id });

		return response.status(200).json({ status: 'success', listParams });
	}

	static async updateBooleanParams(request: Request, response: Response): Promise<Response>
	{
		const { id_params, finish_research, mandatory_question, position } = request.body;

		const updateBooleanParamsQuestionService = new UpdateBooleanParamsQuestionService();
		const paramsUpdated = await updateBooleanParamsQuestionService.execute({ id_params, finish_research, mandatory_question, position });

		return response.status(200).json({status: "success", message: paramsUpdated});
	}
}

export default QuestionParamsController;
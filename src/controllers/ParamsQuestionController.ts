import { Request, Response } from "express";
import CreateParamsQuestionService from "../services/paramsQuestions/CreateParamsQuestionService";
import ListParamsByQuestionService from "../services/paramsQuestions/ListParamsByQuestionService";
import UpdateBooleanParamsQuestionService from "../services/paramsQuestions/UpdateBooleanParamsQuestionService";
import ListParamsOfQuestionsService from "../services/paramsQuestions/ListParamsOfQuestionsService";

class QuestionParamsController
{
	static async createParamsQuestion(request: Request, response: Response): Promise<Response>
	{
		const params = request.body;

		const createParamsQuestionService = new CreateParamsQuestionService();
		const paramsStored = await createParamsQuestionService.execute(params);

		return response.status(200).json({ status: 'success', message: paramsStored });
	}

	static async listParams(request: Request, response: Response): Promise<Response>
	{
		const { question_id } = request.params;

		const listParamsByQuestionService = new ListParamsByQuestionService();
		const listParams = await listParamsByQuestionService.execute({ question_id });

		return response.status(200).json({ status: 'success', listParams });
	}

	static async updateBooleanParams(request: Request, response: Response): Promise<any>
	{
		const params = request.body;

		const updateBooleanParamsQuestionService = new UpdateBooleanParamsQuestionService();
		const paramsUpdated = await updateBooleanParamsQuestionService.execute(params);

		return response.status(200).json({status: 'success', message: paramsUpdated });
	}

	static async listParamsOfQuestion(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;

		const listParamsOfQuestion = new ListParamsOfQuestionsService();
		const list = await listParamsOfQuestion.execute({ id });

		return response.status(200).json({ status: 'success', list });
	}
}

export default QuestionParamsController;
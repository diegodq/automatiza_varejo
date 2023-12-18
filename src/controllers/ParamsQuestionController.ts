import { Request, Response } from "express";
import CreateParamsQuestionService from "../services/paramsQuestions/CreateParamsQuestionService";
import ListParamsByQuestionService from "../services/paramsQuestions/ListParamsByQuestionService";
import UpdateBooleanParamsQuestionService from "../services/paramsQuestions/UpdateBooleanParamsQuestionService";
import ListParamsOfQuestionsService from "../services/paramsQuestions/ListParamsOfQuestionsService";

class QuestionParamsController
{
	static async createParamsQuestion(request: Request, response: Response): Promise<Response>
	{
		const params: any = request.body;

		const createParamsQuestionService: CreateParamsQuestionService = new CreateParamsQuestionService();
		const paramsStored: any = await createParamsQuestionService.execute(params);

		return response.status(200).json({ status: 'success', message: paramsStored });
	}

	static async listParams(request: Request, response: Response): Promise<Response>
	{
		const { question_id } = request.params;

		const listParamsByQuestionService: ListParamsByQuestionService = new ListParamsByQuestionService();
		const listParams: object = await listParamsByQuestionService.execute({ question_id });

		return response.status(200).json({ status: 'success', listParams });
	}

	static async updateBooleanParams(request: Request, response: Response): Promise<Response>
	{
		const params: any = request.body;

		const updateBooleanParamsQuestionService: UpdateBooleanParamsQuestionService = new UpdateBooleanParamsQuestionService();
		const paramsUpdated: object = await updateBooleanParamsQuestionService.execute(params);

		return response.status(200).json({status: 'success', message: paramsUpdated });
	}

	static async listParamsOfQuestion(request: Request, response: Response): Promise<Response>
	{
		const id: any = request.userId;

		const listParamsOfQuestion: ListParamsOfQuestionsService = new ListParamsOfQuestionsService();
		const list: object = await listParamsOfQuestion.execute({ id });

		return response.status(200).json({ status: 'success', list });
	}
}

export default QuestionParamsController;
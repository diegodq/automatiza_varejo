import { Request, Response } from "express";
import CreateQuestionService from "../services/question/CreateQuestionService";
import EditQuestionService from "../services/question/EditQuestionService";
import ListQuestionService from "../services/question/ListQuestionService";
import ListQuestionsService from "../services/question/ListQuestionsService";
import RemoveQuestionService from "../services/question/RemoveQuestionService";
import ChangeStatusQuestionService from "../services/question/ChangeStatusQuestionService";

class QuestionController
{
	static async add(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const { title_question, tree_question, question_description, type_question, status } = request.body;

		const createQuestionService = new CreateQuestionService();
		const questionCreated = await createQuestionService.execute({ title_question, tree_question, question_description, type_question, status, company });

		return response.status(200).json({ status: 'success', questionCreated });
	}

	static async edit(request: Request, response: Response): Promise<Response>
	{
		const { id, question_description, type_question } = request.body;

		const editQuestionService = new EditQuestionService();
		const questionEdited = await editQuestionService.execute({ id, question_description, type_question });

		return response.status(200).json({ status: 'success', message: questionEdited });
	}

	static async changeStatus(request: Request, response: Response): Promise<Response>
	{
		const { id, new_status } = request.body;

		const changeStatusQuestionService = new ChangeStatusQuestionService();
		const changeStatus = await changeStatusQuestionService.execute({ id, new_status });

		return response.status(200).json({ status: 'success', message: changeStatus });
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const listQuestionService = new ListQuestionService();
		const question = await listQuestionService.execute({ id });

		return response.status(200).json({ status: 'success', question });
	}

	static async listAll(request: Request, response: Response): Promise<Response>
	{
		const listQuestionsService = new ListQuestionsService();
		const listQuestions = await listQuestionsService.execute();

		return response.status(200).json({ status: 'success', listQuestions });
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const removeQuestionService = new RemoveQuestionService();
		const questionRemoved = await removeQuestionService.execute({ id });

		return response.status(200).json({ status: 'success', message: questionRemoved });
	}
}

export default QuestionController;
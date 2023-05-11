import { Request, Response } from "express";
import CreateQuestionService from "../services/question/CreateQuestionService";
import EditQuestionService from "../services/question/EditQuestionService";
import ListQuestionService from "../services/question/ListQuestionService";
import ListQuestionsService from "../services/question/ListQuestionsService";
import RemoveQuestionService from "../services/question/RemoveQuestionService";

class QuestionController
{
	static async add(request: Request, response: Response)
	{
		const { question_description, type_question } = request.body;

		const createQuestionService = new CreateQuestionService();
		const questionCreated = await createQuestionService.execute({ question_description, type_question });

		return response.status(200).json({ status: 'success', message: questionCreated });
	}

	static async edit(request: Request, response: Response)
	{
		const { id, question_description, type_question } = request.body;

		const editQuestionService = new EditQuestionService();
		const questionEdited = await editQuestionService.execute({ id, question_description, type_question });

		return response.status(200).json({ status: 'success', message: questionEdited });
	}

	static async list(request: Request, response: Response)
	{
		const { id } = request.body;

		const listQuestionService = new ListQuestionService();
		const question = await listQuestionService.execute({ id });

		return response.status(200).json({ status: 'success', question });
	}

	static async listAll(request: Request, response: Response)
	{
		const listQuestionsService = new ListQuestionsService();
		const listQuestions = await listQuestionsService.execute();

		return response.status(200).json({ status: 'success', listQuestions });
	}

	static async remove(request: Request, response: Response)
	{
		const { id } = request.body;

		const removeQuestionService = new RemoveQuestionService();
		const questionRemoved = await removeQuestionService.execute({ id });

		return response.status(200).json({ status: 'success', message: questionRemoved });
	}
}

export default QuestionController;
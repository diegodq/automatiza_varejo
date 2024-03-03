import { Request, Response } from "express";
import CreateQuestionService from "../services/question/CreateQuestionService";
import EditQuestionService from "../services/question/EditQuestionService";
import ListQuestionService from "../services/question/ListQuestionService";
import ListQuestionsService from "../services/question/ListQuestionsService";
import RemoveQuestionService from "../services/question/RemoveQuestionService";
import ChangeStatusQuestionService from "../services/question/ChangeStatusQuestionService";
import Question from '../entities/Question';
import ChangeStatusTopicService from '../services/topic/ChangeStatusTopicService';
import convertUserIdInCompanyId from "../utils/convertUserIdInCompanyId";
import UpdateMultiplyQuestionsService from "../services/question/UpdateMultiplyQuestionsService";

class QuestionController
{
	static async add(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;
		const company_id = await convertUserIdInCompanyId(Number(id));

		const { title_question, tree_question, question_description, type_question, status, text_end_research, text_label_one, text_label_two, multiply_questions, alert_label } = request.body;

		const createQuestionService: CreateQuestionService = new CreateQuestionService();
		const questionCreated: object = await createQuestionService.execute({ title_question, tree_question, question_description, type_question, status, text_end_research, text_label_one, text_label_two, multiply_questions, alert_label, company_id });

		return response.status(200).json({ status: 'success', questionCreated });
	}

	static async edit(request: Request, response: Response): Promise<Response>
	{
		const { id, title_question, tree_question, question_description, type_question, status, text_end_research, text_label_one, text_label_two, multiply_questions } = request.body;

		const editQuestionService: EditQuestionService = new EditQuestionService();
		const questionEdited: string = await editQuestionService.execute({ id, title_question, tree_question, question_description, type_question, status, text_end_research, text_label_one, text_label_two, multiply_questions });

		return response.status(200).json({ status: 'success', message: questionEdited });
	}

	static async changeStatus(request: Request, response: Response): Promise<Response>
	{
		const { id, new_status } = request.body;

		const changeStatusQuestionService: ChangeStatusTopicService = new ChangeStatusQuestionService();
		const changeStatus: string = await changeStatusQuestionService.execute({ id, new_status });

		return response.status(200).json({ status: 'success', message: changeStatus });
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const listQuestionService: ListQuestionService = new ListQuestionService();
		const question: Question | null = await listQuestionService.execute({ id });

		return response.status(200).json({ status: 'success', question });
	}

	static async listAll(request: Request, response: Response): Promise<Response>
	{
		const company_id = request.userId;

		const { from, to } = request.params;

		const listQuestionsService: ListQuestionsService = new ListQuestionsService();
		if(typeof from === 'undefined' && typeof to === 'undefined') {
			const listQuestions: object = await listQuestionsService.optionalExecute({ company_id });

			return response.status(200).json({ status: 'success', listQuestions });
		} else {
			const listQuestions: object = await listQuestionsService.execute({ company_id, from, to });

			return response.status(200).json({ status: 'success', listQuestions });
		}
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const removeQuestionService: RemoveQuestionService = new RemoveQuestionService();
		const questionRemoved: string = await removeQuestionService.execute({ id });

		return response.status(200).json({ status: 'success', message: questionRemoved });
	}

	static async updateMultiplyQuestions(request: Request, response: Response): Promise<Response>
	{
		const { id_question, multiply_questions} = request.body;

		const updateMultiplyQuestionsService: UpdateMultiplyQuestionsService = new UpdateMultiplyQuestionsService();
		const result: string = await updateMultiplyQuestionsService.execute({ id_question, multiply_questions});

		return response.status(200).json({ status: 'success', message: result });
	}
}

export default QuestionController;
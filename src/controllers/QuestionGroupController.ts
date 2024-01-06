import { Request, Response } from 'express';
import CreateQuestionGroupService from '../services/questionGroup/CreateQuestionGroupService';
import GetQuestionsGroupService from '../services/questionGroup/GetQuestionsGroupService';
import RemoveQuestionGroupService from '../services/questionGroup/RemoveQuestionGroupService';
import UpdateQuestionGroupService from '../services/questionGroup/UpdateQuestionGroupService';

class QuestionGroupController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const { group_name } = request.body;

		const createQuestionGroupService: CreateQuestionGroupService = new CreateQuestionGroupService();
		const groupNameCreated: string = await createQuestionGroupService.execute({ group_name });

		return response.status(201).json(groupNameCreated);

	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const getQuestionsGroupService: GetQuestionsGroupService = new GetQuestionsGroupService();
		const listQuestionsGroupService: object | null = await getQuestionsGroupService.execute();

		return response.status(200).json(listQuestionsGroupService);
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.params;

		const removeQuestionGroupService: RemoveQuestionGroupService = new RemoveQuestionGroupService();
		const questonGroupRemoved: string = await removeQuestionGroupService.execute({id})

		return response.status(200).json(questonGroupRemoved);
	}

	static async update(request: Request, response: Response): Promise<Response>
	{
		const { id, group_name } = request.body;

		const updateQuestionGroupService: UpdateQuestionGroupService = new UpdateQuestionGroupService();
		const questionGroupUpdate: string = await updateQuestionGroupService.execute({ id, group_name });

		return response.status(200).json(questionGroupUpdate);
	}
}

export default QuestionGroupController;
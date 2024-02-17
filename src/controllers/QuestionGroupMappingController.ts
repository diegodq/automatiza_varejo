import { Request, Response } from 'express';
import CreateQuestionGroupMappingService from '../services/questionGroupMapping/CreateQuestionGroupMappingService';
import GetQuestionsGroupMappingService from '../services/questionGroupMapping/GetQuestionsGroupMappingService';
import RemoveQuestionGroupMappingService from '../services/questionGroupMapping/RemoveQuestionGroupMappingService';

class QuestionGroupMappingController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const { questionGroup, question } = request.body;

		const createQuestionGroupMappingService: CreateQuestionGroupMappingService = new CreateQuestionGroupMappingService();
		const createQuestionMapping: string = await createQuestionGroupMappingService.execute({ questionGroup, question });

		return response.status(201).json(createQuestionMapping);
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const { group_id } = request.params;
		const company = request.userId;

		const getQuestionGroupMappingService: GetQuestionsGroupMappingService = new GetQuestionsGroupMappingService();
		const listGroup: object = await getQuestionGroupMappingService.execute({ group_id, company });

		return response.status(200).json(listGroup);
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.params;

		const removeQuestionGroupMappingService: RemoveQuestionGroupMappingService = new RemoveQuestionGroupMappingService();
		const removeGroupMapping: string = await removeQuestionGroupMappingService.execute({ id });

		return response.status(204).json(removeGroupMapping);
	}
}

export default QuestionGroupMappingController;
import questionGroupRepository from '../../repositories/questionGroupRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import QuestionGroup from '../../entities/QuestionGroup';
import questionGroupMappingRepository from '../../repositories/questionGroupMappingRepository';
import QuestionGroupMapping from '../../entities/QuestionGroupMapping';

type QuestionGroupRequest = {
	id: string;
}

class RemoveQuestionGroupService
{
	public async execute({ id }: QuestionGroupRequest): Promise<string>
	{
		const groupQuestion: QuestionGroup | null = await questionGroupRepository.findOneBy({ id: Number(id) });
		if(!groupQuestion) {
			throw new BadRequestError('no-group-question');
		}

		const checkQuestionGroup: QuestionGroupMapping | null = await questionGroupMappingRepository.findOne({ where: {questionGroup: {id: Number(id)} } });
		if(checkQuestionGroup)
			throw new BadRequestError('this-group-is-already-being-used');

		await questionGroupRepository.remove(groupQuestion);

		return 'group-question-removed';
	}
}

export default RemoveQuestionGroupService;
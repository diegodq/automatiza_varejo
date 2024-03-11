import questionGroupRepository from '../../repositories/questionGroupRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import QuestionGroup from '../../entities/QuestionGroup';

type QuestionGroupRequest = {
	id: string;
}

class RemoveQuestionGroupMappingService
{
	public async execute({ id }: QuestionGroupRequest): Promise<string>
	{
		const groupQuestion: QuestionGroup | null = await questionGroupRepository.findOneBy({ id: Number(id) });
		if(!groupQuestion) {
			throw new BadRequestError('no-group-mapping');
		}

		await questionGroupRepository.remove(groupQuestion);

		return 'group-mapping-removed';
	}
}

export default RemoveQuestionGroupMappingService;
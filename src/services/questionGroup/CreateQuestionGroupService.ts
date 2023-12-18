import questionGroupRepository from '../../repositories/questionGroupRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import QuestionGroup from '../../entities/QuestionGroup';

type GroupQuestionType = {
	group_name: string;
}

class CreateQuestionGroupService
{
	public async execute({ group_name }: GroupQuestionType): Promise<string>
	{
		const groupName: QuestionGroup | null = await questionGroupRepository.findOneBy({ group_name });
		if(groupName)
			throw new BadRequestError('group-name-already-exists');

		const newGroupName: QuestionGroup = questionGroupRepository.create({ group_name });
		await questionGroupRepository.save(newGroupName);

		return 'new-group-name-added';
	}
}

export default CreateQuestionGroupService;
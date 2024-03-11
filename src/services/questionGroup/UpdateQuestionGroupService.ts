import questionGroupRepository from '../../repositories/questionGroupRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import QuestionGroup from '../../entities/QuestionGroup';

type GroupQuestionType = {
	id: number;
	group_name: string;
}

class UpdateQuestionGroupService
{
	public async execute({ id, group_name }: GroupQuestionType): Promise<string>
	{
		const questionGroup: QuestionGroup | null = await questionGroupRepository.findOneBy({ id: Number(id) });
		if(!questionGroup) {
			throw new BadRequestError('no-question-group');
		}

		questionGroup.group_name = group_name;

		await questionGroupRepository.save(questionGroup);

		return 'question-group-updated';
	}
}

export default UpdateQuestionGroupService;
import questionGroupRepository from '../../repositories/questionGroupRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import QuestionGroup from '../../entities/QuestionGroup';

class GetQuestionsGroupService
{
	public async execute(): Promise<object | null>
	{
		const listGroupNames:QuestionGroup[] | null  = await questionGroupRepository.find();
		if(!listGroupNames)
			throw new BadRequestError('no-group-name');

		const resultList = listGroupNames.map(
			({created_at, updated_at, ...list}
		) => list);

		return resultList;
	}
}

export default GetQuestionsGroupService;
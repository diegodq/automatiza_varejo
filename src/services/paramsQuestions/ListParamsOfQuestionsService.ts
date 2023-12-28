import { BadRequestError } from "../../utils/ApiErrors";
import questionRepository from "../../repositories/questionRepository";
import Question from '../../entities/Question';

type ParamsType =
{
	id: number
}

class ListParamsOfQuestionsService
{
	public async execute({ id }: ParamsType): Promise<object>
	{
		const paramOfQuestion: Question[] = await questionRepository.find(
			{ where: { company: { id } }, relations: { params_questions: true, company: true } }
		);

		if(paramOfQuestion.length == 0) {
			throw new BadRequestError('no-data');
		}

		return paramOfQuestion;
	}
}

export default ListParamsOfQuestionsService;
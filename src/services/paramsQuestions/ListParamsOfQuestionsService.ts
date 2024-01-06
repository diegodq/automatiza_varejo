import { BadRequestError } from "../../utils/ApiErrors";
import questionRepository from "../../repositories/questionRepository";
import Question from '../../entities/Question';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type ParamsType =
{
	company_id: number
}

class ListParamsOfQuestionsService
{
	public async execute({ company_id }: ParamsType): Promise<object>
	{
		const id = await convertUserIdInCompanyId(Number(company_id));

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
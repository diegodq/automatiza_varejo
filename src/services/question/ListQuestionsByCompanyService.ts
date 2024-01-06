import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import questionRepository from "../../repositories/questionRepository";
import Company from '../../entities/Company';
import Question from '../../entities/Question';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type TopicRequest =
{
	id: number;
}

class ListQuestionsByCompanyService
{
	public async execute({ id }: TopicRequest): Promise<object>
	{
		const idCompany = await convertUserIdInCompanyId(Number(id));

		const companyExists: Company | null = await companyRepository.findOneBy({ id: idCompany });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const listQuestions: Question[] = await questionRepository.find({ where: { company: { id: idCompany } } });
		if(listQuestions.length == 0) {
			throw new BadRequestError('no-questions');
		}

		return listQuestions;
	}
}

export default ListQuestionsByCompanyService;
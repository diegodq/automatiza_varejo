import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import questionRepository from "../../repositories/questionRepository";
import Company from '../../entities/Company';
import Question from '../../entities/Question';

type TopicRequest =
{
	id: number;
}

class ListQuestionsByCompanyService
{
	public async execute({ id }: TopicRequest): Promise<object>
	{
		const companyExists: Company | null = await companyRepository.findOneBy({ id });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const listQuestions: Question[] = await questionRepository.find({ where: { company: { id } } });
		if(listQuestions.length == 0) {
			throw new BadRequestError('no-questions');
		}

		return listQuestions;
	}
}

export default ListQuestionsByCompanyService;
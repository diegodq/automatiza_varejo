import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import questionRepository from "../../repositories/questionRepository";

type TopicRequest =
{
	id: number;
}

class ListQuestionsByCompanyService
{
	public async execute({ id }: TopicRequest): Promise<object>
	{
		const companyExists = await companyRepository.findOneBy({ id });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const listQuestions = await questionRepository.find({ where: { company: { id } } });
		if(listQuestions.length == 0) {
			throw new BadRequestError('no-questions');
		}

		return listQuestions;
	}
}

export default ListQuestionsByCompanyService;
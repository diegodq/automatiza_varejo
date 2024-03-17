import questionRepository from "../../repositories/questionRepository";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import formatCNPJ from "../../utils/formatCNPJ";
import Company from '../../entities/Company';
import Question from '../../entities/Question';

type NPSRequest = {
	cnpj_company: string
}

class ListQuestionAndParamsService
{
	public async execute({ cnpj_company }: NPSRequest): Promise<object>
	{
		const cnpj = formatCNPJ(cnpj_company);
		if(cnpj.length < 14 && cnpj.length > 15) {
			throw new BadRequestError('invalid-cnpj');
		}

		const companyExists: Company | null = await companyRepository.findOneBy({ cnpj });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const id = companyExists.getId;

		const questions: Question[] = await questionRepository.find({
			relations: {
				params_questions: true,
				possible_answers: true
			},

			where: {
				company: { id }
			}
		})

		return { status: "success", questions: questions };
	}
}

export default ListQuestionAndParamsService;
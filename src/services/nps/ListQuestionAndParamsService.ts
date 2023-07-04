import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type NpsRequest =
{
	cnpj: string;
}

class ListQuestionAndParamsService
{
	public async execute({ cnpj }: NpsRequest): Promise<object>
	{
		const companyExists = await companyRepository.findOneBy({ cnpj });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const questionsByCompany = await companyRepository.find({
			relations: {
				question: true
			},
			where: { cnpj }
		})

		const questions = questionsByCompany.map(item => {
			return item.question;
		});

		return questions;
	}
}

export default ListQuestionAndParamsService;
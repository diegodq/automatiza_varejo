import questionRepository from "../../repositories/questionRepository";
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

		const id = companyExists.getId;

		const questions = await questionRepository.find({
			relations: {
				params_questions: true
			},

			where: {
				company: { id }
			}
		})

		return { status: "success", "questions": questions };
	}
}

export default ListQuestionAndParamsService;
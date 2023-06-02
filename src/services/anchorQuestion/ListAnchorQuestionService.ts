import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";

type QuestionRequest =
{
	id: number;
}

class ListAnchorQuestionService
{
	public async execute({ id }: QuestionRequest): Promise<string>
	{
		const company = await companyRepository.findOneBy({ id });
		if(!company) {
			throw new BadRequestError('no-company');
		}

		if(!company.anchor_question) {
			throw new BadRequestError('no-anchor-question');
		}

		return company.anchor_question;
	}
}

export default ListAnchorQuestionService;
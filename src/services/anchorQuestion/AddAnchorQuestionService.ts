import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import paramsProductRepository from "../../repositories/paramsProductRepository";
import Company from "../../entities/Company";

type TopicRequest =
{
	company: Company,
	anchor_question: string;
}

class AddAnchorQuestionService
{
	public async execute({ anchor_question, company }: TopicRequest): Promise<string>
	{
		const anchorQuestionExists = await companyRepository.findOneBy({ id: Number(company) });
		if(!anchorQuestionExists) {
			throw new BadRequestError('no-company');
		}

		const anchorQuestion = paramsProductRepository.create({ anchor_question, company });
		await paramsProductRepository.save(anchorQuestion);

		return anchorQuestion.anchor_question;
	}
}

export default AddAnchorQuestionService;
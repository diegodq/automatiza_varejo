import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import paramsProductRepository from "../../repositories/paramsProductRepository";
import Company from "../../entities/Company";
import ParamsProduct from '../../entities/ParamsProduct';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type TopicRequest =
{
	company_id: number,
	anchor_question: string;
}

class AddAnchorQuestionService
{
	public async execute({ anchor_question, company_id }: TopicRequest): Promise<string>
	{
		const companyId: number = await convertUserIdInCompanyId(Number(company_id));

		const anchorQuestionExists: Company | null = await companyRepository.findOneBy({ id: companyId });
		if(!anchorQuestionExists) {
			throw new BadRequestError('no-company');
		}

		const company: Company = anchorQuestionExists;

		const anchorQuestion: ParamsProduct = paramsProductRepository.create({ anchor_question, company });
		await paramsProductRepository.save(anchorQuestion);

		return anchorQuestion.anchor_question;
	}
}

export default AddAnchorQuestionService;
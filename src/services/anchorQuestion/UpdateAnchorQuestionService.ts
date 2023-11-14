import { BadRequestError } from "../../utils/ApiErrors";
import paramsProductRepository from "../../repositories/paramsProductRepository";
import Company from "../../entities/Company";

type TopicRequest =
{
	company: Company,
	anchor_question: string;
}

class UpdateAnchorQuestionService
{
	public async execute({ anchor_question, company }: TopicRequest): Promise<string>
	{
		const id = Number(company);

		const anchorQuestion = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!anchorQuestion) {
			throw new BadRequestError('no-anchor-question');
		}

		anchorQuestion.anchor_question = anchor_question;
		await paramsProductRepository.save(anchorQuestion);

		return anchorQuestion.anchor_question;
	}
}

export default UpdateAnchorQuestionService;
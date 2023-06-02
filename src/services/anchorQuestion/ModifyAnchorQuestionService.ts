import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";

type TopicRequest =
{
	id: number;
	anchor_question: string;
}

class ModifyAnchorQuestionService
{
	public async execute({ id, anchor_question }: TopicRequest): Promise<string>
	{
		const anchorQuestionExists = await companyRepository.findOneBy({ id });
		if(!anchorQuestionExists) {
			throw new BadRequestError('no-anchor-question');
		}

		if(anchorQuestionExists.anchor_question == anchor_question) {
			throw new BadRequestError('anchor-question-exists');
		}

		anchorQuestionExists.anchor_question = anchor_question;
		await companyRepository.save(anchorQuestionExists);

		return 'anchor-question-added.';
	}
}

export default ModifyAnchorQuestionService;
import { BadRequestError } from "../../utils/ApiErrors";
import questionRepository from "../../repositories/questionRepository";

type TopicRequest =
{
	id: number;
	anchor_question: string;
}

class ModifyAnchorQuestionService
{
	public async execute({ id, anchor_question }: TopicRequest): Promise<string>
	{
		const anchorQuestionExists = await questionRepository.findOneBy({ id });
		if(!anchorQuestionExists) {
			throw new BadRequestError('no-anchor-question');
		}

		if(anchorQuestionExists.anchor_question == anchor_question) {
			throw new BadRequestError('Esta pergunta já está cadastrada.');
		}

		anchorQuestionExists.anchor_question = anchor_question;
		await questionRepository.save(anchorQuestionExists);

		return 'Pergunta âncora adicionada.';
	}
}

export default ModifyAnchorQuestionService;
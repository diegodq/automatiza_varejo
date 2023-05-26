import { BadRequestError } from "../../utils/ApiErrors";
import questionRepository from "../../repositories/questionRepository";

type QuestionRequest =
{
	id: number;
}

class ListAnchorQuestionService
{
	public async execute({ id }: QuestionRequest): Promise<string>
	{
		const question = await questionRepository.findOne({ where: { company: { id } } });

		if(!question) {
			throw new BadRequestError('no-question');
		}

		if(!question.anchor_question) {
			throw new BadRequestError('no-anchor-question');
		}

		return question.anchor_question;
	}
}

export default ListAnchorQuestionService;
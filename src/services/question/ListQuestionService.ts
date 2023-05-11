import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Question from "../../entities/Question";

type QuestionRequest =
{
	id: string;
}

class ListQuestionService
{
	public async execute({ id }: QuestionRequest): Promise<Question | null>
	{
		const listQuestion = await questionRepository.findOneBy({ id: Number(id) });
		if(!listQuestion) {
			throw new BadRequestError('no-question');
		}

		return listQuestion;
	}
}

export default ListQuestionService;
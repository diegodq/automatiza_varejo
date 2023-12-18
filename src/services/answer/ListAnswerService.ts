import answerRepository from "../../repositories/answerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Answer from "../../entities/Answer";

type AnswerQuestion =
{
	id: string;
}

class ListAnswerService
{
	public async execute({ id }: AnswerQuestion): Promise<Answer | null>
	{
		const listAnswer: Answer | null = await answerRepository.findOneBy({ id: Number(id) });
		if(!listAnswer) {
			throw new BadRequestError('no-answer');
		}

		return listAnswer;
	}
}

export default ListAnswerService;
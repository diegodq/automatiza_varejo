import answerRepository from "../../repositories/answerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Answer from "../../entities/Answer";

class ListAnswerService
{
	public async execute(): Promise<Answer[] | null>
	{
		const listAnswers = await answerRepository.find({ order: { id: 'ASC' } });
		if(listAnswers.length == 0) {
			throw new BadRequestError('no-answers');
		}

		return listAnswers;
	}
}

export default ListAnswerService;
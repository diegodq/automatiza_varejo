import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Question from "../../entities/Question";

class ListQuestionsService
{
	public async execute(): Promise<Question[] | null>
	{
		const listQuestions = await questionRepository.find({ order: { id: 'ASC' } });
		if(listQuestions.length == 0) {
			throw new BadRequestError('no-questions');
		}

		return listQuestions;
	}
}

export default ListQuestionsService;
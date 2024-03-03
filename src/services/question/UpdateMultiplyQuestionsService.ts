import Question from "../../entities/Question";
import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionType =
{
	id_question: number;
	multiply_questions: number;
}

class UpdateMultiplyQuestionsService
{
	public async execute({ id_question, multiply_questions}: QuestionType): Promise<string>
	{
		const question: Question | null = await questionRepository.findOneBy({ id: Number(id_question) });
		if(!question)
			throw new BadRequestError('question-not-found');

		question.multiply_questions = multiply_questions;
		await questionRepository.save(question);

		return 'multiply-question-updated';
	}
}

export default UpdateMultiplyQuestionsService;
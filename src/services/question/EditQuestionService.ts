import Question from "../../entities/Question";
import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	id: string;
	title_question: string;
	tree_question: number;
	question_description: string;
	type_question: string;
	status: number;
	text_end_research: string;
	text_label_one: string;
	text_label_two: string;
	multiply_questions: number;
}

class EditQuestionService
{
	public async execute({ id, title_question, tree_question, question_description, type_question, status, text_end_research, text_label_one, text_label_two, multiply_questions }: QuestionRequest)
	{
		const questionExists: Question | null = await questionRepository.findOneBy({ id: Number(id) });
		if(!questionExists) {
			throw new BadRequestError('no-question');
		}

		questionExists.title_question = title_question;
		questionExists.question_description = question_description;
		questionExists.tree_question = tree_question;
		questionExists.type_question = type_question;
		questionExists.status = status;
		questionExists.text_end_research = text_end_research;
		questionExists.text_label_one = text_label_one;
		questionExists.text_label_two = text_label_two;
		questionExists.multiply_questions = multiply_questions;

		await questionRepository.save(questionExists);

		return 'Pergunta atualizada.';
	}
}

export default EditQuestionService;
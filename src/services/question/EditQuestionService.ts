import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	id: string;
	question_description: string;
	type_question: string;
}

class EditQuestionService
{
	public async execute({ id, question_description, type_question }: QuestionRequest)
	{
		const questionExists = await questionRepository.findOneBy({ id: Number(id) });
		if(!questionExists) {
			throw new BadRequestError('no-question');
		}

		questionExists.question_description = question_description;
		questionExists.type_question = type_question;
		await questionRepository.save(questionExists);

		return 'Pergunta atualizada.';
	}
}

export default EditQuestionService;
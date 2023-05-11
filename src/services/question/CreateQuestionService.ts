import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	question_description: string;
	type_question: string;
}

class CreateQuestionService
{
	public async execute({ question_description, type_question }: QuestionRequest): Promise<string>
	{
		const questionExists = await questionRepository.findOneBy({ question_description });
		if(questionExists) {
			throw new BadRequestError('Esta pergunta já está cadastrada.');
		}

		const newQuestion = questionRepository.create({ question_description, type_question });
		await questionRepository.save(newQuestion);

		return 'Nova pergunta adicionada.';
	}
}

export default CreateQuestionService;
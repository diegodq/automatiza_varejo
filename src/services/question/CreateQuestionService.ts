import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	title_question: string;
	question_description: string;
	type_question: string;
	status: number;
}

class CreateQuestionService
{
	public async execute({ title_question, question_description, type_question, status }: QuestionRequest): Promise<string>
	{
		const questionExists = await questionRepository.findOneBy({ question_description });
		if(questionExists) {
			throw new BadRequestError('Esta pergunta já está cadastrada.');
		}

		const newQuestion = questionRepository.create({ title_question, question_description, type_question, status });
		await questionRepository.save(newQuestion);

		return 'Nova pergunta adicionada.';
	}
}

export default CreateQuestionService;
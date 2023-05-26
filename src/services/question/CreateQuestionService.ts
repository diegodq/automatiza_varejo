import Company from "../../entities/Company";
import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	title_question: string,
	question_description: string,
	status: number,
	tree_question: string,
	type_question: string,
	option_one: string;
	option_two: string;
	import_type: string;
	company: Company;
}

class CreateQuestionService
{
	public async execute({ title_question, question_description, status, tree_question, type_question, option_one, option_two, import_type, company }: QuestionRequest): Promise<string>
	{
		const questionExists = await questionRepository.findOneBy({ question_description });
		if(questionExists) {
			throw new BadRequestError('Esta pergunta já está cadastrada.');
		}

		const newQuestion = questionRepository.create({ title_question, question_description, status, tree_question, type_question, option_one, option_two, import_type, company });
		await questionRepository.save(newQuestion);

		return 'Nova pergunta adicionada.';
	}
}

export default CreateQuestionService;
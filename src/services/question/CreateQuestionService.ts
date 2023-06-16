import companyRepository from "../../repositories/companyRepository";
import Company from "../../entities/Company";
import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	title_question: string,
	tree_question: number,
	question_description: string,
	type_question: string,
	status: number,
	company: Company;
}

class CreateQuestionService
{
	public async execute({ title_question, tree_question, question_description, type_question, status, company }: QuestionRequest): Promise<object>
	{
		const companyExists = await companyRepository.findOneBy({ id: Number(company) });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const questionExists = await questionRepository.findOneBy({ question_description });
		if(questionExists) {
			throw new BadRequestError('question-already-registered');
		}

		const newQuestion = questionRepository.create({ title_question, tree_question, question_description, type_question, status, company });
		await questionRepository.save(newQuestion);

		return { message: 'question-added', questionId: newQuestion.getId };
	}
}

export default CreateQuestionService;
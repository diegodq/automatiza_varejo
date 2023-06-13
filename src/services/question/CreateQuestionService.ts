import companyRepository from "../../repositories/companyRepository";
import Company from "../../entities/Company";
import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	title_question: string,
	question_description: string,
	type_question: string,
	status: number,
	company: Company;
}

class CreateQuestionService
{
	public async execute({ title_question, question_description, type_question, status, company }: QuestionRequest): Promise<string>
	{
		const companyExists = await companyRepository.findOneBy({ id: Number(company) });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const questionExists = await questionRepository.findOneBy({ question_description });
		if(questionExists) {
			throw new BadRequestError('question-already-registered');
		}

		const newQuestion = questionRepository.create({ title_question, question_description, type_question, status, company });
		await questionRepository.save(newQuestion);

		return 'question-added';
	}
}

export default CreateQuestionService;
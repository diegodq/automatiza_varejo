import companyRepository from "../../repositories/companyRepository";
import Company from "../../entities/Company";
import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";

type QuestionRequest =
{
	title_question: string,
	tree_question: number,
	question_description: string,
	type_question: string,
	status: number,
	text_end_research: string;
	text_label_one: string;
	text_label_two: string;
	research_title: string;
	alert_label: string;
	company: Company;
}

type DataQuestion = {
	tree_question: number
}

class CreateQuestionService
{
	public async execute({ title_question, tree_question, question_description, type_question, status, text_end_research,
		text_label_one, text_label_two, research_title, alert_label, company }: QuestionRequest): Promise<object>
	{
		const companyExists = await companyRepository.findOneBy({ id: Number(company) });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const existsTypeQuestion = await queryRunner.query(`select type_question, tree_question from question
		where type_question = ? and company_id = ?`, [type_question, company]);

		await queryRunner.release();

		existsTypeQuestion.forEach((eachQuestion: DataQuestion) => {
			if(eachQuestion.tree_question === tree_question) {
				throw new BadRequestError('contact-type-exists-for-this-tree');
			}
		});

		const newQuestion = questionRepository.create({ title_question, tree_question, question_description, type_question, status, text_end_research, text_label_one, text_label_two, research_title, alert_label, company });
		await questionRepository.save(newQuestion);

		return { message: 'question-added', questionId: newQuestion.getId };
	}
}

export default CreateQuestionService;
import companyRepository from "../../repositories/companyRepository";
import Company from "../../entities/Company";
import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";
import { QueryRunner } from 'typeorm';
import Question from '../../entities/Question';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

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
	multiply_questions: number;
	alert_label: string;
	company_id: number;
}

type DataQuestion = {
	tree_question: number
}

class CreateQuestionService
{
	public async execute({ title_question, tree_question, question_description, type_question, status, text_end_research,
		text_label_one, text_label_two, multiply_questions, alert_label, company_id }: QuestionRequest): Promise<object>
	{
		const companyId: number = await convertUserIdInCompanyId(Number(company_id));

		const companyExists: Company | null = await companyRepository.findOneBy({ id: Number(companyId) });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const company: Company = companyExists;

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const existsTypeQuestion = await queryRunner.query(`select type_question, tree_question from question
		where type_question = ? and company_id = ?`, [type_question, company.id]);

		await queryRunner.release();

		existsTypeQuestion.forEach((eachQuestion: DataQuestion) => {
			if(eachQuestion.tree_question === tree_question) {
				throw new BadRequestError('contact-type-exists-for-this-tree');
			}
		});

		const newQuestion: Question = questionRepository.create({ title_question, tree_question, question_description, type_question, status, text_end_research, text_label_one, text_label_two, multiply_questions, alert_label, company });
		await questionRepository.save(newQuestion);

		return { message: 'question-added', questionId: newQuestion.getId };
	}
}

export default CreateQuestionService;
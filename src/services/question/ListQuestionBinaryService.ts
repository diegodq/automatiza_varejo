import appDataSource from "../../data-source";
import Company from "../../entities/Company";
import { BadRequestError } from "../../utils/ApiErrors";

type RequestParams =
{
	company: Company,
	from: string,
	to: string,
	store_number: string
}


class ListQuestionBinaryService
{
	public async execute({company, from, to, store_number}: RequestParams)
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`SELECT DISTINCT
			question.question_description AS pergunta,
			question.tree_question AS arvore,
			params_questions.option_one,
			params_questions.option_two
		FROM question
		JOIN params_questions ON question.id = params_questions.question_id
		JOIN answer ON question.id = answer.question_id
		JOIN store ON store.id = answer.store_id
			AND params_questions.option_one <> ''
			AND params_questions.option_two <> ''
			AND question.company_id = ?
			AND DATE(answer.created_at) BETWEEN ? AND ?
			AND store.store_number = ?
		GROUP BY
			params_questions.option_one,
			params_questions.option_two,
			question.tree_question,
			question.question_description,
			answer.answer,
			answer.store_id,
			answer.created_at;`, [company, from, to, store_number]);

		await queryRunner.release();

		if(queryResult.length == 0)
			throw new BadRequestError('no-results');

		let countOptionOne = 0;
		let countOptionTwo = 0;

		queryResult.forEach((pergunta: { option_one: string; option_two: string; }) => {
			if (pergunta.option_one === pergunta.option_one || pergunta.option_one === pergunta.option_one) {
				countOptionOne++;
			} else if (pergunta.option_two === pergunta.option_two || pergunta.option_two === pergunta.option_two) {
				countOptionTwo++;
			}
		});

		queryResult.forEach((pergunta: { [x: string]: number; }) => {
			pergunta[pergunta.option_one] = countOptionOne;
			pergunta[pergunta.option_two] = countOptionTwo;

			delete pergunta["option_one"];
  		delete pergunta["option_two"];
		});

		return queryResult;
	}
}

export default ListQuestionBinaryService;
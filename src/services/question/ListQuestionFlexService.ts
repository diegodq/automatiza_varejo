import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";
import appDataSource from "../../data-source";
import Company from "../../entities/Company";
import { BadRequestError } from "../../utils/ApiErrors";

type RequestParams =
{
	company: Company,
	from: string,
	to: string,
	id_store: string
}

type TransformedData = {
  pergunta: string;
  arvore: number;
  [key: string]: number | string;
};


class ListQuestionFlexService
{
	public async execute({company, from, to, id_store}: RequestParams)
	{
		const idCompany = await convertUserIdInCompanyId(Number(company));

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		let queryResult = null;
		if(id_store == undefined) {
			queryResult = await queryRunner.query(`SELECT
			question.id AS question_id,
			question.question_description AS pergunta,
			question.tree_question AS arvore,
			answer.answer,
			COUNT(answer.answer) AS incidencias
	FROM
			question
	LEFT JOIN (
			SELECT question_id, answer
			FROM answer
			WHERE DATE(created_at) BETWEEN ? AND ?
	) AS answer ON question.id = answer.question_id
	WHERE
			question.type_question = 'flex'
			AND question.company_id = ?
	GROUP BY
			question.id,
			question.question_description,
			question.tree_question,
			answer.answer;`, [from, to, idCompany]);
		} else {
			queryResult = await queryRunner.query(`SELECT
			question.id AS question_id,
			question.question_description AS pergunta,
			question.tree_question AS arvore,
			answer.answer,
			COUNT(answer.answer) AS incidencias
	FROM
			question
	LEFT JOIN (
			SELECT question_id, answer
			FROM answer
			WHERE DATE(created_at) BETWEEN ? AND ?
	) AS answer ON question.id = answer.question_id
	WHERE
			question.type_question = 'flex'
			AND question.company_id = ?
	GROUP BY
			question.id,
			question.question_description,
			question.tree_question,
			answer.answer;`, [from, to, idCompany]);
		}

		await queryRunner.release();

		if(queryResult.length == 0)
			throw new BadRequestError('no-results');


		return queryResult;
	}
}

export default ListQuestionFlexService;
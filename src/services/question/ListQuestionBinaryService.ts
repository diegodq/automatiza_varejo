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


class ListQuestionBinaryService
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
			params_questions.option_one,
			SUM(CASE WHEN answer.answer = params_questions.option_one THEN 1 ELSE 0 END) AS incidencias_option_one,
			params_questions.option_two,
			SUM(CASE WHEN answer.answer = params_questions.option_two THEN 1 ELSE 0 END) AS incidencias_option_two
		FROM
			question
		JOIN
			params_questions ON question.id = params_questions.question_id
		LEFT JOIN
			answer ON question.id = answer.question_id
				AND (answer.answer = params_questions.option_one OR answer.answer = params_questions.option_two)
				AND params_questions.option_one <> ''
				AND params_questions.option_two <> ''
		WHERE
			question.type_question = 'binary'
			AND question.company_id = ?
			AND DATE(answer.created_at) BETWEEN ? AND ?
		GROUP BY
			question.id,
			question.question_description,
			question.tree_question,
			params_questions.option_one,
			params_questions.option_two;`, [idCompany, from, to]);
		} else {
			queryResult = await queryRunner.query(`SELECT
			question.id AS question_id,
			question.question_description AS pergunta,
			question.tree_question AS arvore,
			params_questions.option_one,
			SUM(CASE WHEN answer.answer = params_questions.option_one THEN 1 ELSE 0 END) AS incidencias_option_one,
			params_questions.option_two,
			SUM(CASE WHEN answer.answer = params_questions.option_two THEN 1 ELSE 0 END) AS incidencias_option_two
		FROM
			question
		JOIN
			params_questions ON question.id = params_questions.question_id
		LEFT JOIN
			answer ON question.id = answer.question_id
			JOIN store ON store.id = answer.store_id
				AND (answer.answer = params_questions.option_one OR answer.answer = params_questions.option_two)
				AND params_questions.option_one <> ''
				AND params_questions.option_two <> ''
				AND DATE(answer.created_at) BETWEEN '${from}' AND '${to}'
		WHERE
			question.type_question = 'binary'
			AND question.company_id = ${idCompany}
			AND store.id = ${id_store}
		GROUP BY
			question.id,
			question.question_description,
			question.tree_question,
			params_questions.option_one,
			params_questions.option_two;`);
		}


		await queryRunner.release();

		console.log(queryResult);

		if(queryResult.length == 0)
			throw new BadRequestError('no-results');

		const dadosTransformados: TransformedData[] = queryResult.map((item: { pergunta: string; arvore: string; option_one: string; incidencias_option_one: string; option_two: string; incidencias_option_two: string; }) => {
			const { pergunta, arvore, option_one, incidencias_option_one, option_two, incidencias_option_two } = item;

			return {
				pergunta,
				arvore,
				[option_one]: incidencias_option_one,
				[option_two]: incidencias_option_two,
			};
		});

		return dadosTransformados;
	}
}

export default ListQuestionBinaryService;
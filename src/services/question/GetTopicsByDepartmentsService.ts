import appDataSource from '../../data-source';
import convertUserIdInCompanyId from '../../utils/convertUserIdInCompanyId';
import { QueryRunner } from 'typeorm';
import { BadRequestError } from '../../utils/ApiErrors';

type RequestParams =
{
	company: number,
	from: string,
	to: string,
	id_store: string
}

class GetTopicsByDepartmentsService
{
	public async execute({ company, from, to, id_store }: RequestParams): Promise<object>
	{
		const company_id: number = await convertUserIdInCompanyId(company);

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const departments = await queryRunner.query(`select department.name from department
		where department.status = 1 and department.company_id = ?;`, [company_id]);

		let positive = null;
		if(id_store == undefined) {
			positive = await queryRunner.query(`SELECT
			answer.answer,
			answer.other_answer,
			question.tree_question,
			answer.created_at FROM answer JOIN
			question ON question.id = answer.question_id AND question.tree_question = 1 WHERE
			question.company_id = ?
			AND DATE(answer.created_at) BETWEEN ? AND ?
			AND answer.other_answer <> '';`, [company_id, from, to]);
		} else {
			positive = await queryRunner.query(`SELECT
			answer.answer,
			answer.other_answer,
			question.tree_question,
			answer.created_at FROM answer JOIN question ON question.id = answer.question_id AND question.tree_question = 0 WHERE
			question.company_id = ? AND DATE(answer.created_at) BETWEEN ? AND ?
			AND answer.other_answer <> '' and answer.store_id = ?;`, [company_id, from, to, id_store]);
		}

		let negative = null;
		if(id_store == undefined) {
			negative = await queryRunner.query(`SELECT
			answer.answer,
			answer.other_answer,
			question.tree_question,
			answer.created_at FROM answer JOIN
			question ON question.id = answer.question_id AND question.tree_question = 0 WHERE
			question.company_id = ?
			AND DATE(answer.created_at) BETWEEN ? AND ?
			AND answer.other_answer <> '';`, [company_id, from, to]);
		} else {
			negative = await queryRunner.query(`SELECT
			answer.answer,
			answer.other_answer,
			question.tree_question,
			answer.created_at FROM answer JOIN
			question ON question.id = answer.question_id AND question.tree_question = 1 WHERE
			question.company_id = ?
			AND DATE(answer.created_at) BETWEEN ? AND ?
			AND answer.other_answer <> '' and answer.store_id = ?;`, [company_id, from, to, id_store]);
		}

		await queryRunner.release();

		if (negative.length === 0 && positive.length === 0)
			throw new BadRequestError('no-data');

		const result: { POSITIVA: any, NEGATIVA: any } = await this.processResponses(departments, { positive, negative });
		return result;
	}

	private async processResponses(departamentos: any[], data: { positive: any[], negative: any[] }): Promise<{ POSITIVA: any, NEGATIVA: any }>
	{
    const resultadoEsperado: { POSITIVA: any, NEGATIVA: any } = {
      POSITIVA: {},
      NEGATIVA: {}
    };

    departamentos.forEach((departamento: { name: string }) => {
      resultadoEsperado.POSITIVA[departamento.name] = {};
      resultadoEsperado.NEGATIVA[departamento.name] = {};
    });

    data.positive.forEach((resposta: { answer: string, other_answer: string }) => {
      const departamento: string = resposta.answer;
      const outrasRespostas: string[] = resposta.other_answer.split(', ');

      outrasRespostas.forEach((outraResposta: string) => {
        resultadoEsperado.POSITIVA[departamento][outraResposta] = (resultadoEsperado.POSITIVA[departamento][outraResposta] || 0) + 1;
      });
    });

    data.negative.forEach((resposta: { answer: string, other_answer: string }) => {
      const departamento: string = resposta.answer;
      const outrasRespostas: string[] = resposta.other_answer.split(', ');

      outrasRespostas.forEach((outraResposta: string) => {
        resultadoEsperado.NEGATIVA[departamento][outraResposta] = (resultadoEsperado.NEGATIVA[departamento][outraResposta] || 0) + 1;
      });
    });

    return resultadoEsperado;
	}
}

export default GetTopicsByDepartmentsService;
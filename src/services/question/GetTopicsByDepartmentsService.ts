import Company from '../../entities/Company';
import appDataSource from '../../data-source';
import { QueryRunner } from 'typeorm';

type RequestParams =
{
	company: Company,
	from: string,
	to: string,
	id_store: string
}

class GetTopicsByDepartmentsService
{
	public async execute({ company, from, to, id_store }: RequestParams): Promise<object>
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const departamentos = await queryRunner.query(`select department.name from department
		where department.status = 1 and department.company_id = 2;`);

		let positive = null;
		if(id_store == undefined) {
			positive = await queryRunner.query(`SELECT
			answer.answer,
			answer.other_answer,
			question.tree_question,
			answer.created_at FROM answer JOIN
			question ON question.id = answer.question_id AND question.tree_question = 1 WHERE
			question.company_id = 2
			AND DATE(answer.created_at) BETWEEN '2023-08-31' AND '2024-03-12'
			AND answer.other_answer <> '';`);
		} else {
			positive = await queryRunner.query(`SELECT
			answer.answer,
			answer.other_answer,
			question.tree_question,
			answer.created_at FROM answer JOIN question ON question.id = answer.question_id AND question.tree_question = 0 WHERE
			question.company_id = 2 AND DATE(answer.created_at) BETWEEN '2023-08-31' AND '2024-03-12'
			AND answer.other_answer <> '' answer.store_id = 1;`);
		}

		let negative = null;
		if(id_store == undefined) {
			negative = await queryRunner.query(`SELECT
			answer.answer,
			answer.other_answer,
			question.tree_question,
			answer.created_at FROM answer JOIN
			question ON question.id = answer.question_id AND question.tree_question = 0 WHERE
			question.company_id = 2
			AND DATE(answer.created_at) BETWEEN '2023-08-31' AND '2024-03-12'
			AND answer.other_answer <> '';`);
		} else {
			negative = await queryRunner.query(`SELECT
			answer.answer,
			answer.other_answer,
			question.tree_question,
			answer.created_at FROM answer JOIN
			question ON question.id = answer.question_id AND question.tree_question = 1 WHERE
			question.company_id = 2
			AND DATE(answer.created_at) BETWEEN '2023-08-31' AND '2024-03-12'
			AND answer.other_answer <> '' and answer.store_id = 1;`);
		}

		await queryRunner.release();

		return await this.processResponses(departamentos, { positive, negative })
	}

	private async processResponses(departamentos: any[], data: { positive: any[], negative: any[] }): Promise<{ POSITIVA: any, NEGATIVA: any }> {
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
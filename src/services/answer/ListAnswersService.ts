import { BadRequestError } from "../../utils/ApiErrors";
import Answer from "../../entities/Answer";
import appDataSource from "../../data-source";
import { QueryRunner } from 'typeorm';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type QueryString =
{
	from?: string;
	to?: string;
	store: string,
	company_id: string;
}

type OptionalQuery = {
	company_id: string;
}

class ListAnswerService
{
	public async execute({ company_id, from, to, store }: QueryString): Promise<Answer[] | null>
	{
		const idCompany = await convertUserIdInCompanyId(Number(company_id));

		if(typeof store === 'undefined') {
			const queryRunner: QueryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`select answer.*, question.company_id from question
			join answer on question.id = answer.question_id where question.company_id = ?
			and DATE(answer.created_at) BETWEEN ? AND ? order by answer.id asc;`, [ idCompany, from, to ]);

			await queryRunner.release();
			if(resultQuery.length == 0) {
				throw new BadRequestError('no-answers');
			}

			return resultQuery;
		} else {
			const queryRunner: QueryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`select answer.*, store.company_id, store.store_number from store
			join answer on store.id = answer.question_id where store.company_id = ? and store.store_number = ?
			and DATE(answer.created_at) BETWEEN ? AND ? order by answer.id asc;`, [ idCompany, store, from, to ]);

			await queryRunner.release();
			if(resultQuery.length == 0) {
				throw new BadRequestError('no-answers');
			}

			return resultQuery;
		}
	}

	public async optionalExecute({ company_id }:OptionalQuery): Promise<Answer[] | null>
	{
		const idCompany = await convertUserIdInCompanyId(Number(company_id));

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select answer.id, answer.answer, answer.client_name, answer.client_phone, answer.is_contact,
		answer.is_report, answer.type_report, answer.id_research, answer.research_name, answer.nps_answer,
		answer.device_client, answer.start_research, answer.name_employee, answer.other_answer, CONVERT_TZ(answer.created_at, '+00:00', '-03:00') as created_at,
		CONVERT_TZ(answer.updated_at, '+00:00', '-03:00') as updated_at, answer.question_id, answer.store_id, question.company_id from question
		join answer on question.id = answer.question_id where question.company_id = '${idCompany}' order by answer.id asc;`);

		await queryRunner.release();
		if(resultQuery.length == 0) {
			throw new BadRequestError('no-answers');
		}

		return resultQuery;
	}
}

export default ListAnswerService;
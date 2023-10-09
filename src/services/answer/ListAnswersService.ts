import { BadRequestError } from "../../utils/ApiErrors";
import Answer from "../../entities/Answer";
import appDataSource from "../../data-source";

type QueryString =
{
	from?: string;
	to?: string;
	company_id: string;
}

type OptionalQuery = {
	company_id: string;
}

class ListAnswerService
{
	public async execute({ company_id, from, to }: QueryString): Promise<Answer[] | null>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery: any = await queryRunner.query(`select answer.*, question.company_id from question
		join answer on question.id = answer.question_id where question.company_id = ${company_id}
		and DATE(answer.created_at) BETWEEN '${from}' AND '${to}' order by answer.id asc;`);

		await queryRunner.release();
		if(resultQuery.length == 0) {
			throw new BadRequestError('no-answers');
		}

		return resultQuery;
	}

	public async optionalExecute({ company_id }:OptionalQuery): Promise<Answer[] | null>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery: any = await queryRunner.query(`select answer.id, answer.answer, answer.research_title, answer.client_name, answer.client_phone, answer.is_contact,
		answer.is_report, answer.type_report, answer.id_research, answer.research_name, answer.nps_answer,
		answer.device_client, answer.start_research, answer.name_employee, CONVERT_TZ(answer.created_at, '+00:00', '-03:00') as created_at,
		CONVERT_TZ(answer.updated_at, '+00:00', '-03:00') as updated_at, answer.question_id, question.company_id from question
		join answer on question.id = answer.question_id where question.company_id = '${company_id}' order by answer.id asc;`);

		await queryRunner.release();
		if(resultQuery.length == 0) {
			throw new BadRequestError('no-answers');
		}

		return resultQuery;
	}
}

export default ListAnswerService;
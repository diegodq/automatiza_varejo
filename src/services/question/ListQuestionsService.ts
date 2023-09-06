import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";
import Company from "src/entities/Company";

type QueryString =
{
	company_id: Company;
	from: string;
	to: string
}

type QueryExecute = {
	company_id: Company;
}

class ListQuestionsService
{
	public async optionalExecute({ company_id }: QueryExecute): Promise<object>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query('select * from question where company_id = ? order by id asc;', [ company_id ]);

		await queryRunner.release();

		if(resultQuery.length === 0){
			throw new BadRequestError('no-questions');
		}
		return resultQuery;
	}

	public async execute({ company_id, from, to }: QueryString): Promise<object>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select * from question where company_id = 2
		and DATE(question.created_at) BETWEEN ? AND ? order by question.id asc;`, [ company_id, from, to ]);

		await queryRunner.release();

		if(resultQuery.length === 0){
			throw new BadRequestError('no-questions');
		}
		return resultQuery;
	}
}

export default ListQuestionsService;
import { BadRequestError } from "src/utils/ApiErrors";
import appDataSource from "../../data-source";

class ListStoreByCompany
{
	public async execute(company: any): Promise<object>
	{
		const company_id = Number(company.company);

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select id, name, address, store_number, active from store where company_id = ?;`, [company_id]);
		
		await queryRunner.release();

		if(resultQuery.length === 0)
			throw new BadRequestError('no-store');

		return resultQuery;
	}
}

export default ListStoreByCompany;
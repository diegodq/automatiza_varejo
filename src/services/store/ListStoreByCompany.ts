import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";
import { QueryRunner } from 'typeorm';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

class ListStoreByCompany
{
	public async execute(company: any): Promise<object>
	{
		const idCompany = await convertUserIdInCompanyId(Number(company.company));

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select id, name, address, store_number, active from store where company_id = ?;`, [idCompany]);

		await queryRunner.release();

		if(resultQuery.length === 0)
			throw new BadRequestError('no-store');

		resultQuery.forEach((item: { store_number: string | number; }) => {
			if(item.store_number == 0) item.store_number = '';
		});

		return resultQuery;
	}
}

export default ListStoreByCompany;
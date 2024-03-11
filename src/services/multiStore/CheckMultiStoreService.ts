import Company from "../../entities/Company";
import appDataSource from "../../data-source";
import { QueryRunner } from 'typeorm';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type PropsTypes = {
	companyId: Company
}

class CheckMultiStoreService
{
	public async execute({companyId}: PropsTypes ): Promise<boolean>
	{
		const idCompany = await convertUserIdInCompanyId(Number(companyId));

		// const company = Number(companyId);

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select multi_store from company_product where company = ?;`, [ idCompany ]);

		await queryRunner.release();

		let result = 0;
		queryResult.forEach((item: {multi_store: number}) => {
			result = item.multi_store;
		});

		if(result) return true;
		else return false;
	}
}
export default CheckMultiStoreService;
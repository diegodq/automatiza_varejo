import Company from "../../entities/Company";
import appDataSource from "../../data-source";

type PropsTypes = {
	companyId: Company
}

class CheckMultiStoreService
{
	public async execute({companyId}: PropsTypes ): Promise<boolean>
	{
		const company = Number(companyId);

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select multi_store from company_product where company = ?;`, [ company ]);

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
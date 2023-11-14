import appDataSource from "../../data-source";

class CheckMultiStoreService
{
	public async execute(company: any): Promise<boolean>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select multi_store from company_product where company = ? limit 1;`, [ company ]);

		await queryRunner.release();

		let result = 0;
		queryResult.forEach((item: { multi_store: any; }) => {
			result = item.multi_store;
		});

		if(result)
			return true;
		else
			return false;
	}
}
export default CheckMultiStoreService;
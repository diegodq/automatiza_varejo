import appDataSource from "../../data-source";

type TypeStore =
{
	status: number,
	company: any
}

class DisableStoreService
{
	public async execute({ status, company }: TypeStore): Promise<string>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`update store set active = ${status} where company_id = ${company};`);

		await queryRunner.release();

		return 'store-updated';
	}
}

export default DisableStoreService;
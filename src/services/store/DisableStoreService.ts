import appDataSource from "../../data-source";
import { QueryRunner } from 'typeorm';

type TypeStore =
{
	status: number,
	store_number: number
}

class DisableStoreService
{
	public async execute({ status, store_number }: TypeStore): Promise<string>
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`update store set active = ? where store_number = ?;`, [status, store_number]);

		await queryRunner.release();

		return 'status-updated';
	}
}

export default DisableStoreService;
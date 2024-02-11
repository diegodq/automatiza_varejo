import appDataSource from "../../data-source";
import { QueryRunner } from "typeorm";

class ListTypeCustomersService
{
	public async execute(): Promise<object>
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const getRoleId = await queryRunner.query(`select id, name from roles;`,);

		await queryRunner.release();

		return getRoleId;
	}
}

export default ListTypeCustomersService;
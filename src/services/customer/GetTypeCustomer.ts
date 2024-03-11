import appDataSource from "../../data-source";
import { QueryRunner } from "typeorm";

class GetTypeCustomer
{
	public async execute(id: string): Promise<object>
	{
		const idCustomer = Number(id);

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const getRoleId = await queryRunner.query(`select roles.name from roles join roles_customer
		on roles_customer.role_id = roles.id
		where roles_customer.customer_id = ?;`,[idCustomer]);

		await queryRunner.release();

		return getRoleId;
	}
}

export default GetTypeCustomer;
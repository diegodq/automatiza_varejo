import appDataSource from "../../data-source";
import { QueryRunner } from "typeorm";

class ListPermissionsByCustomerService
{
	public async execute(id_customer: string): Promise<object>
	{
		const queryRunner = appDataSource.createQueryRunner();

		await queryRunner.connect();

		const queryResult: QueryRunner = await queryRunner.query(`select customer.first_name, permission.name from customer join
		customer_permissions on customer.id = customer_permissions.customer
		join permission on permission.id = customer_permissions.permission
		where customer.id = ?;`, [ id_customer ]);

		await queryRunner.release();

		return queryResult;
	}
}

export default ListPermissionsByCustomerService;
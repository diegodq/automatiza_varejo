import { QueryRunner } from 'typeorm';
import appDataSource from "../../data-source";

class ListRoleByCustomerService
{
	public async execute(id_customer: string): Promise<object>
	{
		const queryRunner = appDataSource.createQueryRunner();

		await queryRunner.connect();

		const queryResult: QueryRunner = await queryRunner.query(`select customer.first_name, roles.name from customer
		join roles_customer on customer.id = roles_customer.customer join roles
		on roles.id = roles_customer.role where customer.id = ?;`, [ id_customer ]);

		await queryRunner.release();

		return queryResult;
	}
}

export default ListRoleByCustomerService;
import appDataSource from "../../data-source";

type RoleRequest = {
	id_role: number;
	id_customer: number;
}

class AddRoleToCustomerService
{
	public async execute({ id_role, id_customer }: RoleRequest): Promise<string>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into roles_customer (role, customer) values (?, ?);`, [id_role, id_customer]);

		await queryRunner.release();

		return 'added-role';
	}
}

export default AddRoleToCustomerService;
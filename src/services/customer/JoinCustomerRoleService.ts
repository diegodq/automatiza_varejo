import appDataSource from '../../data-source';
type RoleCustomerRequest = {
	role_id: number,
	customer_id: number
}

class JoinCustomerRoleService
{
	public async execute({ role_id, customer_id }: RoleCustomerRequest): Promise<string>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into roles_customer (role_id, customer_id) values (?, ?);`, [role_id, customer_id]);

		await queryRunner.release();

		return 'role-customer-added';
	}
}

export default JoinCustomerRoleService;
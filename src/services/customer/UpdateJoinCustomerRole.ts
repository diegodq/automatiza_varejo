import appDataSource from '../../data-source';
type RoleCustomerRequest = {
	role_id: number,
	customer_id: number
}

class UpdateJoinCustomerRole
{
	public async execute({ role_id, customer_id }: RoleCustomerRequest): Promise<string>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`update roles_customer set role_id = ? where customer_id = ?;`, [role_id, customer_id]);

		await queryRunner.release();

		return 'role-customer-updated';
	}
}

export default UpdateJoinCustomerRole;
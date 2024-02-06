import appDataSource from "../../data-source";

type PermissionRequest = {
	id_customer: number;
	id_permission: number;
}

class AddPermissionToCustomerService
{
	public async execute({ id_customer, id_permission }: PermissionRequest): Promise<string>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into customer_permissions (customer, permission) values (?, ?);`, [id_customer, id_permission]);

		await queryRunner.release();

		return 'added-permission';
	}
}

export default AddPermissionToCustomerService;
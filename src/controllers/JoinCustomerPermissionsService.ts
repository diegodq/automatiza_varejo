import appDataSource from "../data-source";

type RequestType = {
	customer_id: number,
	permissions: []
}

class JoinCustomerPermissionsService
{
	public async execute({ customer_id, permissions }: RequestType): Promise<string>
	{
		const sortArray = permissions.sort((a, b) => {
			return a - b;
		});

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		for(let index = 0; index < sortArray.length; index++)
		{
			queryRunner.query(`insert into customer_permissions (customer_id, permission_id) values (${customer_id}, ${sortArray[index]})`);
		}

		await queryRunner.release();

		return 'permission-added';
	}
}

export default JoinCustomerPermissionsService;
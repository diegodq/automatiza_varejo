import appDataSource from "../data-source";
import { FixedRole } from "./enums";

async function canPermission(userId: string, method: string): Promise<boolean>
{
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();

	const queryResult = await queryRunner.query(`select roles_customer.role_id from roles_customer
	where roles_customer.customer_id = ?;`, [ Number(userId) ]);

	await queryRunner.release();

	let roleName  = null;
	queryResult.forEach((permission: { role_id: number }) => {
		if(permission.role_id !== FixedRole.ADMINISTRATOR && permission.role_id !== FixedRole.GERENTE)
			roleName = 'OTHER';
	});

	if (roleName === FixedRole.OTHER && method !== 'GET')
		return false;

	return true;
}

export default canPermission;
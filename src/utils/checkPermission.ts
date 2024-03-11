 import appDataSource from "../data-source";

async function checkPermission(user: number, permission: number): Promise<boolean> {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();

	const queryResult = await queryRunner.query(`select customer_permissions.permission_id from customer_permissions
	where customer_permissions.customer_id = ?
	and customer_permissions.permission_id = ?;`, [user, permission]);

	await queryRunner.release();

	let hasPermission = false;
	queryResult.forEach((permissionUser: {permission_id: number})=> {
		if(permissionUser.permission_id === permission)
			hasPermission = true;
	});

	return hasPermission;
}

export default checkPermission;
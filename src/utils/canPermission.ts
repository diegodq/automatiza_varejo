import appDataSource from "../data-source";

async function canPermission(userId: string, path: string, method: string): Promise<boolean>
{
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();

	const queryResult = await queryRunner.query(`select paths.path, paths.http_verb from paths
	join customer_paths on paths.id = customer_paths.path_id join customer
	on customer.id = customer_paths.customer_id
	where customer_paths.customer_id = ? and paths.path = ? and paths.http_verb = ?;`, [ Number(userId), path, method ] );

	await queryRunner.release();

	if (queryResult.length === 0)
		return false;

	return true;
}

export default canPermission;
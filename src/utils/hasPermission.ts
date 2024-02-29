import appDataSource from "../data-source";
import checkPermission from "./checkPermission";
import { FixedRole, HTTP_Verbs } from "./enums";

async function canPermission(idUser: number, path: string, method: string): Promise<boolean>
{
	if(await checkPermission(idUser, FixedRole.ADMINISTRATOR))
		return true;
	else if (await checkPermission(idUser, FixedRole.GERENTE))
		return true
	else {
		if(method === HTTP_Verbs.GET) {
			path = '*';

			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const queryResult = await queryRunner.query(`select paths.path, paths.http_verb from paths
			join customer_paths on paths.id = customer_paths.path_id join customer
			on customer.id = customer_paths.customer_id
			where customer_paths.customer_id = ? and paths.path = ? and paths.http_verb = ?;`, [ idUser, path, method ] );

			await queryRunner.release();

			if (queryResult.length === 0)
				return false;
		} else {
			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const queryResult = await queryRunner.query(`select paths.path, paths.http_verb from paths
			join customer_paths on paths.id = customer_paths.path_id join customer
			on customer.id = customer_paths.customer_id
			where customer_paths.customer_id = ? and paths.path = ? and paths.http_verb = ?;`, [ idUser, path, method ] );

			await queryRunner.release();

			if (queryResult.length === 0)
				return false;
		}
	}

	return true;
}
export default canPermission;
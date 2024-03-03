import appDataSource from "../data-source";
import { FixedRole } from "./enums";

async function checkRootAccount(rootId: number): Promise<boolean>
{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select roles_customer.role_id from roles_customer
		where roles_customer.customer_id = ?;`, [rootId]);

		await queryRunner.release();

		let isRoot = false;
		queryResult.forEach((role: {role_id: number}) => {
			if(role.role_id === FixedRole.ADMINISTRATOR || role.role_id === FixedRole.GERENTE)
				isRoot = true;
		});

		return isRoot;
}

export default checkRootAccount;
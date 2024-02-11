import { Request, Response } from "express";
import appDataSource from "../data-source";
import { QueryRunner } from "typeorm";

class DeleteController
{
	static async deleteTest(request: Request, response: Response): Promise<Response>
	{
		const userId = Number(request.userId);

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const getRole = await queryRunner.query(`select roles.name from roles join roles_customer
		on roles.id = roles_customer.role_id where roles_customer.customer_id = ?;`,[userId]);

		const getPermission = await queryRunner.query(`select permissions.name from permissions join customer_permissions
		on customer_permissions.permission_id = permissions.id
		where customer_permissions.customer_id = ?;`, [userId]);

		await queryRunner.release();

		return response.status(200).json({ role: getRole, permissions: getPermission });
	}
}

export default DeleteController;
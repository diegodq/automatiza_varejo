import { Request, Response } from "express";
import AddRoleToCustomer from "../services/roles/AddRoleToCustomerService";
import ListRoleByCustomerService from "../services/roles/ListRoleByCustomerService";
import ListRoleService from "../services/roles/ListRoleService";

class RolesController
{
	public static async createRoles(request: Request, response: Response): Promise<Response>
	{
		return response.status(200).json({});
	}

	public static async editRoles(request: Request, response: Response): Promise<Response>
	{
		return response.status(200).json({});
	}

	public static async listRolesByEmployee(request: Request, response: Response): Promise<Response>
	{
		return response.status(200).json({});
	}

	public static async listRolesService(request: Request, response: Response): Promise<Response>
	{
		const listRoleService:ListRoleService = new ListRoleService();
		const listRoles: object = await listRoleService.execute();

		return response.status(200).json(listRoles);
	}

	public static async removeRoles(request: Request, response: Response): Promise<Response>
	{
		return response.status(200).json({});
	}

	public static async addRoleToCustomer(request: Request, response: Response): Promise<Response>
	{
		const { id_role, id_customer } = request.body;

		const addRoleToCustomer: AddRoleToCustomer = new AddRoleToCustomer();
		const roleAdded: string = await addRoleToCustomer.execute({ id_role, id_customer });

		return response.status(200).json(roleAdded);
	}

	public static async listRoleByCustomer(request: Request, response: Response): Promise<Response>
	{
		const { id_customer } = request.params;

		const listRoleByEmployeeService:ListRoleByCustomerService = new ListRoleByCustomerService();
		const listRoles: object = await listRoleByEmployeeService.execute(id_customer);

		return response.status(200).json(listRoles);
	}
}

export default RolesController;
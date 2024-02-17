import { Request, Response } from "express";
import CreatePermissionsService from "../services/permissions/CreatePermissionsService";
import UpdatePermissionService from "../services/permissions/UpdatePermissionService";
import ListPermissionsService from "../services/permissions/ListPermissionsService";
import RemovePermissionsService from "../services/permissions/RemovePermissionsService";
import AddPermissionToCustomerService from "../services/permissions/AddPermissionToCustomerService";
import ListPermissionsByCustomerService from "../services/permissions/ListPermissionsByCustomerService";

class PermissionController
{
	public static async createPermission(request: Request, response: Response): Promise<Response>
	{
		const {name, description} = request.body;

		const createPermissionService: CreatePermissionsService = new CreatePermissionsService();
		const permissionCreated: string = await createPermissionService.execute({ name, description });

		return response.status(200).json(permissionCreated);
	}

	public static async updatePermission(request: Request, response: Response): Promise<Response>
	{
		const { id, name, description } = request.body;

		const updatePermissionService: UpdatePermissionService = new UpdatePermissionService();
		const updatePermission: string = await updatePermissionService.execute({ id, name, description });

		return response.status(200).json(updatePermission);
	}

	public static async listPermissionByEmployee(request: Request, response: Response): Promise<Response>
	{
		return response.status(200).json({});
	}

	public static async listPermissionService(request: Request, response: Response): Promise<Response>
	{
		const listPermissionsService: ListPermissionsService = new ListPermissionsService();
		const resultList: object = await listPermissionsService.execute();

		return response.status(200).json(resultList);
	}

	public static async removePermission(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const removePermissionsService: RemovePermissionsService = new RemovePermissionsService();
		const permissionRemoved: string = await removePermissionsService.execute( id );

		return response.status(204).json(permissionRemoved);
	}

	public static async addPermissionToCustomer(request: Request, response: Response)
	{
		const { id_customer, id_permission } = request.body;

		const addPermissionToCustomerService: AddPermissionToCustomerService = new AddPermissionToCustomerService();
		const permissionAdded: string = await addPermissionToCustomerService.execute({ id_customer, id_permission });

		return response.status(200).json(permissionAdded);
	}

	public static async listPermissionByCustomer(request: Request, response: Response): Promise<Response>
	{
		const { id_customer } = request.params;

		const listPermissionsByCustomerService: ListPermissionsByCustomerService = new ListPermissionsByCustomerService();
		const listPermissions: object = await listPermissionsByCustomerService.execute(id_customer);

		return response.status(200).json(listPermissions);
	}
}

export default PermissionController;
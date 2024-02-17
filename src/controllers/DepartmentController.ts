import { Request, Response } from "express";
import CreateDepartmentService from "../services/department/CreateDepartment.tService";
import DeleteDepartmentService from "../services/department/DeleteDepartmentService";
import EditDepartmentService from "../services/department/EditDepartmentService";
import ListDepartmentsService from "../services/department/ListDepartmentsService";
import ListDepartmentService from "../services/department/ListDepartmentService";
import ChangeStatusDepartmentService from "../services/department/ChangeStatusDepartmentService";
import CreateDepartmentTService from '../services/department/CreateDepartment.tService';
import changeStatusDepartmentService from '../services/department/ChangeStatusDepartmentService';
import Department from '../entities/Department';

class DepartmentController
{
	static async add(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const { name, status } = request.body;

		const createDepartmentService: CreateDepartmentTService = new CreateDepartmentService();
		const newDepartment = await createDepartmentService.execute({ name, status, company });

		return response.status(200).json({ status: 'success', message: newDepartment });
	}

	static async update(request: Request, response: Response): Promise<Response>
	{
		const { id, name, status } = request.body;
''
		const editDepartmentService: EditDepartmentService = new EditDepartmentService();
		const editDepartment: string = await editDepartmentService.execute({ id, name, status });

		return response.status(200).json({ status: 'success', message: editDepartment });
	}

	static async changeStatus(request: Request, response: Response): Promise<Response>
	{
		const { id, new_status } = request.body;

		const changeStatusDepartmentService: changeStatusDepartmentService = new ChangeStatusDepartmentService();
		const changeStatus: string = await changeStatusDepartmentService.execute({ id, new_status });

		return response.status(200).json({ status: 'success', message: changeStatus });
	}

	static async delete(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const deleteDepartmentService: DeleteDepartmentService = new DeleteDepartmentService();
		const departmentRemoved: string = await deleteDepartmentService.execute({ id });

		return response.status(204).json({ status: 'success', message: departmentRemoved });
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const listDepartmentService: ListDepartmentService = new ListDepartmentService();
		const listDepartment: Department | null = await listDepartmentService.execute({ id });

		return response.status(200).json({ status: 'success', listDepartment });
	}

	static async listAll(request: Request, response: Response): Promise<Response>
	{
		const listDepartmentsService: ListDepartmentsService = new ListDepartmentsService();
		const listDepartments: Department[] | null = await listDepartmentsService.execute();

		return response.status(200).json({ status: 'success', listDepartments });
	}
}

export default DepartmentController;
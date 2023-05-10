import { Request, Response } from "express";
import CreateDepartmentService from "../services/department/CreateDepartment.tService";
import DeleteDepartmentService from "../services/department/DeleteDepartmentService";
import EditDepartmentService from "../services/department/EditDepartmentService";
import ListDepartmentService from "../services/department/ListDepartmentsService";

class DepartmentController
{
	static async add(request: Request, response: Response)
	{
		const { name, status } = request.body;

		const createDepartmentService = new CreateDepartmentService();
		const newDepartment = await createDepartmentService.execute({ name, status });

		return response.status(200).json({ status: 'success', message: newDepartment });
	}

	static async update(request: Request, response: Response)
	{
		const { id, name, status } = request.body;

		const editDepartmentService = new EditDepartmentService();
		const editDepartment = await editDepartmentService.execute({ id, name, status });

		return response.status(200).json({ status: 'success', message: editDepartment });
	}

	static async delete(request: Request, response: Response)
	{
		const { id } = request.body;

		const deleteDepartmentService = new DeleteDepartmentService();
		const departmentRemoved = await deleteDepartmentService.execute({ id });

		return response.status(200).json({ status: 'success', message: departmentRemoved });
	}

	static async list(request: Request, response: Response)
	{
		const listDepartmentService = new ListDepartmentService();
		const listDepartments = await listDepartmentService.execute();

		return response.status(200).json({ status: 'success', message: listDepartments });
	}
}

export default DepartmentController;
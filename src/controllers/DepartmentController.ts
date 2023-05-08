import { Request, Response } from "express";
import CreateDepartmentService from "src/services/department/CreateDepartment.tService";
import DeleteDepartmentService from "src/services/department/DeleteDepartmentService";
import EditDepartmentService from "src/services/department/EditDepartmentService";

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
		const id = request.userId;
		const { name, status } = request.body;

		const editDepartmentService = new EditDepartmentService();
		const editDepartment = await editDepartmentService.execute({ id, name, status });

		return response.status(200).json({ status: 'success', message: editDepartment });
	}

	static async delete(request: Request, response: Response)
	{
		const id = request.userId;

		const deleteDepartmentService = new DeleteDepartmentService();
		const departmentRemoved = await deleteDepartmentService.execute({ id });

		return response.status(200).json({ status: 'success', message: departmentRemoved });
	}
}

export default DepartmentController;
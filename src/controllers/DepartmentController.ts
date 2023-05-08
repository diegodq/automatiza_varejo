import { Request, Response } from "express";
import CreateDepartmentService from "src/services/department/CreateDepartment.tService";
import EditDepartmentService from "src/services/department/EditDepartmentService";

class DepartmentController
{
	static async add(request: Request, response: Response)
	{
		const { department, status } = request.body;

		const createDepartmentService = new CreateDepartmentService();
		const newDepartment = await createDepartmentService.execute({ department, status });

		return response.status(200).json({ status: 'success', message: newDepartment });
	}

	static async update(request: Request, response: Response)
	{
		const { id, department, status } = request.body;

		const editDepartmentService = new EditDepartmentService();
		const editDepartment = await editDepartmentService.execute({ id, department, status });

		return response.status(200).json({ status: 'success', message: editDepartment });
	}
}

export default DepartmentController;
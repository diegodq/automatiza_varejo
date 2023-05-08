import departmentRepository from "src/repositories/departmentRepository";
import { BadRequestError } from "src/utils/ApiErrors";

type DepartmentRequest =
{
	id: string;
	department: string;
	status: string;
}

class EditDepartmentService
{
	public async execute({ id, department, status }: DepartmentRequest)
	{
		const departmentExists = await departmentRepository.findOneBy({ id: Number(id) });
		if(!departmentExists) {
			throw new BadRequestError('Departamento não existe.');
		}

		departmentExists.department = department;
		departmentExists.status = status;
		await departmentRepository.save(departmentExists);

		return 'Departamento atualizado.';
	}
}

export default EditDepartmentService;
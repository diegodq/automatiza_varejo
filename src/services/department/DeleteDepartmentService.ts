import departmentRepository from "../../repositories/departmentRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type DepartmentRequest =
{
	id: string;
}

class DeleteDepartmentService
{
	public async execute({ id }: DepartmentRequest)
	{
		const department = await departmentRepository.findOneBy({ id: Number(id) });
		if(!department) {
			throw new BadRequestError('no-department');
		}

		await departmentRepository.remove(department);
		return 'Departamento removido.';
	}
}

export default DeleteDepartmentService;
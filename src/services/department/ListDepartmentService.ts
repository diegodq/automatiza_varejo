import departmentRepository from "../../repositories/departmentRepository";
import Department from "../../entities/Department";
import { BadRequestError } from "../../utils/ApiErrors";

type DepartmentRequest = {
	id: number;
}

class ListDepartmentService
{
	public async execute({ id }: DepartmentRequest): Promise<Department | null>
	{
		const listDepartment = await departmentRepository.findOneBy({ id });
		if(!listDepartment) {
			throw new BadRequestError('no-department');
		}

		return listDepartment;
	}
}

export default ListDepartmentService;
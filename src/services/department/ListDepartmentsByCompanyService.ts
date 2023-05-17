import departmentRepository from "../../repositories/departmentRepository";
import Department from "../../entities/Department";
import { BadRequestError } from "../../utils/ApiErrors";

type DepartmentRequest =
{
	id: string;
}

class ListDepartmentsByCompanyService
{
	public async execute({ id }: DepartmentRequest): Promise<Department[] | null>
	{
		const listDepartment = await departmentRepository.find({ where: { id: Number(id) }, relations: { company: true } });
		if(!listDepartment) {
			throw new BadRequestError('no-departments');
		}

		return listDepartment;
	}
}

export default ListDepartmentsByCompanyService;
import departmentRepository from "../../repositories/departmentRepository";
import Department from "../../entities/Department";
import { BadRequestError } from "../../utils/ApiErrors";

class ListDepartmentsService
{
	public async execute(): Promise<Department[] | null>
	{
		const listDepartment = await departmentRepository.find({ order: { id: 'ASC' } });
		if(listDepartment.length == 0) {
			throw new BadRequestError('no-departments');
		}

		return listDepartment;
	}
}

export default ListDepartmentsService;
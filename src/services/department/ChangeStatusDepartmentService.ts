import departmentRepository from "../../repositories/departmentRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Department from '../../entities/Department';

type TopicRequest =
{
	id: string;
	new_status: string;
}

class ChangeStatusDepartmentService
{
	public async execute({ id, new_status }: TopicRequest): Promise<string>
	{
		const departmentExist: Department | null = await departmentRepository.findOneBy({ id: Number(id) });
		if(!departmentExist) {
			throw new BadRequestError('no-department');
		}

		departmentExist.status = Number(new_status);
		await departmentRepository.save(departmentExist);

		return 'Status atualizado';
	}
}

export default ChangeStatusDepartmentService;
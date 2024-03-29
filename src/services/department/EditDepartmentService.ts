import departmentRepository from "../../repositories/departmentRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Department from '../../entities/Department';

type DepartmentRequest =
{
	id: string;
	name: string;
	status: number;
}

class EditDepartmentService
{
	public async execute({ id, name, status }: DepartmentRequest): Promise<string>
	{
		const departmentExists: Department | null = await departmentRepository.findOneBy({ id: Number(id) });
		if(!departmentExists) {
			throw new BadRequestError('no-department');
		}

		if(departmentExists.name === name) {
			throw new BadRequestError('Digite um nome diferente para este departamento.');
		}

		departmentExists.name = name;
		departmentExists.status = status;
		await departmentRepository.save(departmentExists);

		return 'Departamento atualizado.';
	}
}

export default EditDepartmentService;
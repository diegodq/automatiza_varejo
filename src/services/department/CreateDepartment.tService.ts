import departmentRepository from "../../repositories/departmentRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type DepartmentRequest =
{
	name: string;
	status: number;
}

class CreateDepartmentService
{
	public async execute({ name, status }: DepartmentRequest)
	{
		const departmentExist = await departmentRepository.findOneBy({ name });
		if(departmentExist) {
			throw new BadRequestError('Este tópico já está cadastrado.');
		}

		const newDepartment = departmentRepository.create({ name, status });
		await departmentRepository.save(newDepartment);

		return 'Novo tópico adicionado.';
	}
}

export default CreateDepartmentService;
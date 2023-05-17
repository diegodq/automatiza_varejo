import Company from "src/entities/Company";
import departmentRepository from "../../repositories/departmentRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type DepartmentRequest =
{
	name: string;
	status: number;
	company: Company;
}

class CreateDepartmentService
{
	public async execute({ name, status, company }: DepartmentRequest)
	{
		const departmentExist = await departmentRepository.findOneBy({ name });
		if(departmentExist) {
			throw new BadRequestError('Este tópico já está cadastrado.');
		}

		const newDepartment = departmentRepository.create({ name, status, company });
		await departmentRepository.save(newDepartment);

		return 'Novo departamento adicionado.';
	}
}

export default CreateDepartmentService;
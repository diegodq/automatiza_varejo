import Company from "../../entities/Company";
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
	public async execute({ name, status, company }: DepartmentRequest): Promise<string | any>
	{
		const departmentExist = await departmentRepository.findOne({ where: { company: { id: Number(company) } } });
		if(departmentExist?.name == name) {
			throw new BadRequestError('Departamento já cadastrado.');
		}

		const newDepartment = departmentRepository.create({ name, status, company });
		await departmentRepository.save(newDepartment);

		return 'Novo departamento adicionado.';
	}
}

export default CreateDepartmentService;
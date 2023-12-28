import departmentRepository from "../../repositories/departmentRepository";
import Company from "../../entities/Company";
import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import Department from '../../entities/Department';


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
		const companyExists: Company | null = await companyRepository.findOneBy({ id: Number(company) });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const departmentExists: Department | null = await departmentRepository.findOne({ where: { company: { id: Number(company) } } });
		if(departmentExists?.name == name) {
			throw new BadRequestError('Tópico já cadastrado.');
		}

		const newDepartment: Department = departmentRepository.create({ name, status, company });
		await departmentRepository.save(newDepartment);

		return 'Departamento adicionado.';
	}
}

export default CreateDepartmentService;
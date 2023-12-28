import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import departmentRepository from "../../repositories/departmentRepository";
import Company from '../../entities/Company';
import Department from '../../entities/Department';

type CompanyRequest =
{
	id: number;
}

class ListDepartmentsByCompanyService
{
	public async execute({ id }: CompanyRequest): Promise<object>
	{
		const companyExists: Company | null = await companyRepository.findOneBy({ id });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const listDepartments: Department[] = await departmentRepository.find({ where: { company: { id } } });
		if(listDepartments.length == 0) {
			throw new BadRequestError('no-departments');
		}

		return listDepartments;
	}
}

export default ListDepartmentsByCompanyService;
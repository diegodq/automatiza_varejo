import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import departmentRepository from "../../repositories/departmentRepository";
import Company from '../../entities/Company';
import Department from '../../entities/Department';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type CompanyRequest =
{
	id: number;
}

class ListDepartmentsByCompanyService
{
	public async execute({ id }: CompanyRequest): Promise<object>
	{
		const idCompany = await convertUserIdInCompanyId(Number(id));

		const companyExists: Company | null = await companyRepository.findOneBy({ id: idCompany });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const listDepartments: Department[] = await departmentRepository.find({ where: { company: { id: idCompany } } });
		if(listDepartments.length == 0) {
			throw new BadRequestError('no-departments');
		}

		return listDepartments;
	}
}

export default ListDepartmentsByCompanyService;
import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import departmentRepository from "../../repositories/departmentRepository";

type CompanyRequest =
{
	id: number;
}

class ListDepartmentsByCompanyService
{
	public async execute({ id }: CompanyRequest): Promise<object>
	{
		const companyExists = await companyRepository.findOneBy({ id });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const listDepartments = await departmentRepository.find({ where: { company: { id } } });
		if(listDepartments.length == 0) {
			throw new BadRequestError('no-departments');
		}

		return listDepartments;
	}
}

export default ListDepartmentsByCompanyService;
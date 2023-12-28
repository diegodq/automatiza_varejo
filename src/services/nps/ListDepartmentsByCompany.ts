import { BadRequestError } from "../../utils/ApiErrors";
import formatCNPJ from "../../utils/formatCNPJ";
import companyRepository from "../../repositories/companyRepository";
import Company from '../../entities/Company';
import Department from '../../entities/Department';

type NPSRequest = {
	cnpj_company: string
}

class ListDepartmentsByCompany
{
	public async execute({ cnpj_company }: NPSRequest): Promise<object>
	{
		const cnpj = formatCNPJ(cnpj_company);
		if(cnpj.length < 14 && cnpj.length > 15) {
			throw new BadRequestError('invalid-cnpj');
		}

		const companyExists: Company | null = await companyRepository.findOneBy({ cnpj });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const id = companyExists.getId;

		const topicByCompany: Company[] = await companyRepository.find({
			relations: {
				department: true
			},
			where: { id }
		});

		const departments: Department[][] = topicByCompany.map(item => {
			return item.department;
		});

		return { status: 'success', departments: departments }
	}
}

export default ListDepartmentsByCompany;
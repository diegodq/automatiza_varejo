import { BadRequestError } from "../../utils/ApiErrors";
import formatCNPJ from "../../utils/formatCNPJ";
import companyRepository from "../../repositories/companyRepository";

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

		const companyExists = await companyRepository.findOneBy({ cnpj });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const id = companyExists.getId;

		const topicByCompany = await companyRepository.find({
			relations: {
				department: true
			},
			where: { id }
		});

		const departments = topicByCompany.map(item => {
			return item.department;
		});

		return { status: 'success', departments: departments }
	}
}

export default ListDepartmentsByCompany;
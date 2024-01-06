import companyRepository from '../../repositories/companyRepository';
import { BadRequestError } from "../../utils/ApiErrors";
import Company from '../../entities/Company';
import convertUserIdInCompanyId from '../../utils/convertUserIdInCompanyId';

type LogoRequest =
{
	id: string;
}

class ReturnLogoClientService
{
	public async execute({ id }: LogoRequest): Promise<string>
	{
		const idCompany = await convertUserIdInCompanyId(Number(id));

		const company: Company | null = await companyRepository.findOneBy({ id: idCompany });
		if(!company) {
			throw new BadRequestError('Usuário não encontrado.');
		}

		if(!company.logo_company){
			throw new BadRequestError('logo não adicionado.');
		}

		return company.logo_company;
	}
}

export default ReturnLogoClientService;
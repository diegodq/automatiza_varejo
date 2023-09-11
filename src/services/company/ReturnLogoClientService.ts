import companyRepository from '../../repositories/companyRepository';
import { BadRequestError } from "../../utils/ApiErrors";

type LogoRequest =
{
	id: string;
}

class ReturnLogoClientService
{
	public async execute({ id }: LogoRequest): Promise<string>
	{
		const company = await companyRepository.findOneBy({ id: Number(id) });
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
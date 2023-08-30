import Company from "../../entities/Company";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type RequestCompany =
{
	id: string;
}

class ShowCompanyService
{
	public async execute({ id }: RequestCompany): Promise<Company | null>
	{
		const company = await companyRepository.findOneBy({ id: Number(id) });
		if(!company) {
			throw new BadRequestError('Não há empresa cadastrada');
		}

		return company;
	}
}

export default ShowCompanyService;
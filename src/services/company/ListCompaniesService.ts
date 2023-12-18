import { BadRequestError } from "../../utils/ApiErrors";
import Company from "../../entities/Company";
import companyRepository from "../../repositories/companyRepository";

class ListCompaniesService
{
	public async execute(): Promise<Company[] | null>
	{
		const listCompanies: Company[] = await companyRepository.find({ order: { id: 'ASC' } });
		if (listCompanies.length == 0) {
			throw new BadRequestError('Não há empresa cadastrada.');
		}

		return listCompanies;
	}
}

export default ListCompaniesService;
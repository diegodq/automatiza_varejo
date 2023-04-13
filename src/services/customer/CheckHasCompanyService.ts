import appDataSource from "src/data-source";
import Company from "src/entities/Company";
import customerRepository from "src/repositories/customerRepository";
import { BadRequestError } from "src/utils/ApiErrors";

type RequestCompany =
{
	id: string;
}

class CheckHasCompanyService
{
	public async execute({ id }: RequestCompany): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		const hasCompany = await appDataSource.getRepository(Company).createQueryBuilder("company")
		.where("company.customer = :id", { id }).getOne();
		if(!hasCompany) {
			throw new BadRequestError('no-company')
		}

		return 'has-company';
	}
}

export default CheckHasCompanyService;
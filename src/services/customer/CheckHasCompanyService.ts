import appDataSource from "../../data-source";
import Company from "../../entities/Company";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Customer from '../../entities/Customer';
import { ObjectLiteral } from 'typeorm';

type RequestCompany =
{
	id: string;
}

class CheckHasCompanyService
{
	public async execute({ id }: RequestCompany): Promise<string>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		const hasCompany: ObjectLiteral | null = await appDataSource.getRepository(Company).createQueryBuilder("company")
		.where("company.customer = :id", { id }).getOne();
		if(!hasCompany) {
			throw new BadRequestError('no-company')
		}

		return 'has-company';
	}
}

export default CheckHasCompanyService;
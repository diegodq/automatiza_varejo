import appDataSource from "../../data-source";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Customer from '../../entities/Customer';
import { ObjectLiteral } from 'typeorm';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

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
			throw new BadRequestError('no-registered-customer');
		}

		const idCompany = await convertUserIdInCompanyId(Number(id));

		const hasCompany: ObjectLiteral | null = await appDataSource.getRepository(Customer).createQueryBuilder("customer")
		.where("customer.company_id = :idCompany", { idCompany }).getOne();
		if(!hasCompany) {
			throw new BadRequestError('no-company');
		}

		return 'has-company';
	}
}

export default CheckHasCompanyService;
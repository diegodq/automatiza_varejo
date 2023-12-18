import typeCustomerRepository from '../../repositories/typeCustomerRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import TypeCustomer from '../../entities/TypeCustomer';

type TypeCustomerRequest = {
	id: string;
	type_customer: string;
}

class UpdateTypeCustomerService
{
	public async execute({ id, type_customer }: TypeCustomerRequest): Promise<string>
	{
		const typeCustomer: TypeCustomer | null = await typeCustomerRepository.findOneBy({ id: Number(id) });
		if(!typeCustomer) {
			throw new BadRequestError('no-type-customer');
		}

		typeCustomer.type_customer = type_customer;

		await typeCustomerRepository.save(typeCustomer);

		return 'type-customer-updated';
	}
}

export default UpdateTypeCustomerService;
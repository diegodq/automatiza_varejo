import typeCustomerRepository from '../../repositories/typeCustomerRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import TypeCustomer from '../../entities/TypeCustomer';

type TypeCustomerRequest = {
	id: string;
}

class RemoveTypeCustomerService
{
	public async execute({ id }: TypeCustomerRequest): Promise<string>
	{
		const typeCustomer: TypeCustomer | null = await typeCustomerRepository.findOneBy({ id: Number(id) });
		if(!typeCustomer) {
			throw new BadRequestError('no-type-customer');
		}

		await typeCustomerRepository.remove(typeCustomer);

		return 'type-customer-removed';
	}
}

export default RemoveTypeCustomerService;
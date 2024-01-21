import typeCustomerRepository from '../../repositories/typeCustomerRepository';
import TypeCustomer from '../../entities/TypeCustomer';
import { BadRequestError } from '../../utils/ApiErrors';

class GetTypeCustomersService
{
	public async execute(): Promise<object> {
		const listCustomers: TypeCustomer[] | null = await typeCustomerRepository.find();
		if(!listCustomers)
			throw new BadRequestError('no-customer');

		const resultList: object = listCustomers.map(
			({customer,createdAt,updatedAt,...list}
		) => list);

		return resultList;
	}
}

export default GetTypeCustomersService;
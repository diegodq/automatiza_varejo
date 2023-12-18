import typeCustomerRepository from '../../repositories/typeCustomerRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import TypeCustomer from '../../entities/TypeCustomer';

type CustomerType = {
	type_customer: string;
}
class CreateTypeCustomerService
{
	public async execute({ type_customer}: CustomerType): Promise<string>
	{
		const typeCustomerExists: TypeCustomer | null = await typeCustomerRepository.findOneBy({ type_customer });
		if(typeCustomerExists)
			throw new BadRequestError('type-customer-already-exists');

		const newTypeCustomer: TypeCustomer = typeCustomerRepository.create({ type_customer });
		await typeCustomerRepository.save(newTypeCustomer);

		return 'new-customer-added';
	}
}

export default CreateTypeCustomerService;
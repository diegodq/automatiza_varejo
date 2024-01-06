import Customer from "../../entities/Customer";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

class ListCustomerService
{
	public async execute(): Promise<Customer[] | undefined>
	{
		const showCustomer: Customer[] = await customerRepository.find();
		if(showCustomer.length == 0) {
			throw new BadRequestError('there-is-no-registered-clients.');
		}

		return showCustomer;
	}
}

export default ListCustomerService;
import Customer from "../../entities/Customer";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

class ListCustomerService
{
	public async execute(): Promise<Customer[] | undefined>
	{
		const showCustomer = await customerRepository.find();
		if(showCustomer.length == 0) {
			throw new BadRequestError('Não há clientes cadastrados.');
		}

		return showCustomer;
	}
}

export default ListCustomerService;
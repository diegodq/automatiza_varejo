import Customer from "../../entities/Customer";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type RequestCustomer =
{
	id: string;
}

class ShowCustomerService
{
	public async execute({ id }: RequestCustomer): Promise<Customer | null>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		return customer;
	}
}

export default ShowCustomerService;
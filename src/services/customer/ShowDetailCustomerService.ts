import Customer from "../../entities/Customer";
import customerRepository from "../../repositories/customerRepository";

type RequestCustomer =
{
	id: string;
}

class ShowDetailCustomerService
{
	public async execute({ id }: RequestCustomer): Promise<Customer[]>
	{
		const details = await customerRepository.find({
			where: { id: Number(id) },
			relations: {
				company: true
			}
		});

		return details;
	}
}

export default ShowDetailCustomerService;
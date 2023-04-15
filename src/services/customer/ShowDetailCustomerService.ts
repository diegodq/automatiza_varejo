import { BadRequestError } from "../../utils/ApiErrors";
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
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		const details = await customerRepository.find({
			where: { id: Number(id) },
			relations: {
				company: true
			}
		});

		const allDataCustomer = Object.assign({}, ...details.map(item => {
			const company = item.company[0];
			const { company: deletedProperty, ...newItem } = item;
			return Object.assign({}, newItem, company);
	}));

		return allDataCustomer;
	}
}

export default ShowDetailCustomerService;
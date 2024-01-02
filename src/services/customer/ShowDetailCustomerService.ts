import { BadRequestError } from "../../utils/ApiErrors";
import customerRepository from "../../repositories/customerRepository";
import Customer from '../../entities/Customer';

type RequestCustomer =
{
	id: number;
}

class ShowDetailCustomerService
{
	public async execute({ id }: RequestCustomer): Promise<object>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ id })
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.')
		}

		const details: Customer[] = await customerRepository.find({
			where: { id: Number(id) },
			relations: {
				company: true
			}
		})

		const allDataCustomer = Object.assign({}, ...details.map(item => {
			const company = item.company
			const { company: deletedProperty, ...newItem } = item
			return Object.assign({}, newItem, company)
		}))

		return allDataCustomer;
	}
}

export default ShowDetailCustomerService;
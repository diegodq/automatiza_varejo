import { BadRequestError } from "../../utils/ApiErrors";
import customerRepository from "../../repositories/customerRepository";
import companyRepository from "../../repositories/companyRepository";

type RequestCustomer =
{
	id: number;
}

class ShowDetailCustomerService
{
	public async execute({ id }: RequestCustomer): Promise<object>
	{
		const customer = await customerRepository.findOneBy({ id })
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.')
		}

		const details = await companyRepository.find({
			where: { id: Number(id) },
			relations: {
				customer: true
			}
		})

		const allDataCustomer = Object.assign({}, ...details.map(item => {
			const company = item.customer
			const { customer: deletedProperty, ...newItem } = item
			return Object.assign({}, newItem, company)
		}))

		return allDataCustomer;
	}
}

export default ShowDetailCustomerService;
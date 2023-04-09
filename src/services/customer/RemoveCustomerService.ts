import customerRepository from "../../repositories/customerRepository";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type RequestCustomer =
{
	id: string;
}

class RemoveCustomerService
{
	public async execute({ id }: RequestCustomer): Promise<string>
	{

		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		const customerHasCompany = await companyRepository.findOneBy({ customer });
		if(customerHasCompany) {
			throw new BadRequestError('Existe(m) empresa(s) adicionada(s) para este cliente.');
		}

		await customerRepository.remove(customer);

		return 'Cliente removido.'
	}
}

export default RemoveCustomerService;
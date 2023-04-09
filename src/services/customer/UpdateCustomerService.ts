import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import paramsConfig from "../../params/paramsConfig";

type TypeRequest =
{
	id: string;
	first_name: string;
	surname: string;
	position: string;
	phone: string;
}

class UpdateCustomerService
{
	public async execute({ id, first_name, surname, position, phone }: TypeRequest): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if (!customer) {
			throw new BadRequestError('Cliente não encontrado.');
		}

		if(paramsConfig.params.allowChangeCPF) {
			customer.first_name = first_name;
			customer.surname = surname;
			customer.position = position;
			customer.phone = phone;

			await customerRepository.save(customer);
		}

		if(!paramsConfig.params.allowChangeCPF) {
			customer.first_name = first_name;
			customer.surname = surname;
			customer.position = position;
			customer.phone = phone;

			await customerRepository.save(customer);
		}

		return 'Cliente atualizado.';
	}
}

export default UpdateCustomerService;
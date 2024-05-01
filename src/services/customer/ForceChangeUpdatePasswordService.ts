import Customer from "../../entities/Customer";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type DataRequest =
{
	id_user: number,
	change: number
}

class ForceChangeUpdatePasswordService
{
	public async execute({ id_user, change }: DataRequest): Promise<string>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id_user) });
		if(!customer)
			throw new BadRequestError('no-user');

		customer.change_password = change;
		await customerRepository.save(customer);

		return 'updated';
	}
}

export default ForceChangeUpdatePasswordService;
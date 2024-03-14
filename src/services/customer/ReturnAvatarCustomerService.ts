import Customer from "src/entities/Customer";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type AvatarRequest =
{
	id: string;

}

class ReturnAvatarCustomerService
{
	public async execute({ id }: AvatarRequest): Promise<string>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('user-not-found');
		}

		if(!customer.avatar){
			throw new BadRequestError('avatar-not-found');
		}

		return customer.avatar;
	}
}

export default ReturnAvatarCustomerService;
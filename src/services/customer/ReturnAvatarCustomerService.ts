import 'dotenv/config';
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
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Usuário não encontrado.');
		}

		if(!customer.avatar){
			throw new BadRequestError('Avatar não adicionado.');
		}

		return customer.avatar;
	}
}

export default ReturnAvatarCustomerService;
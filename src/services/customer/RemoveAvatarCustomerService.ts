import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type AvatarRequest =
{
	id: string;
	avatar: string;
}

class RemoveAvatarCustomerService
{
	public async execute({ id, avatar }: AvatarRequest): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Avatar não encontrado.');
		}

		const customerAvatar = customerRepository.find({ where:{ avatar } });
		if(!customerAvatar) {
			throw new BadRequestError('Avatar não encontrado');
		}

		customer.avatar = '';
		await customerRepository.save(customer);

		return 'Avatar removido';
	}
}

export default RemoveAvatarCustomerService;
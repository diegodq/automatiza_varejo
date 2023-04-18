import customerRepository from "../../repositories/customerRepository";
import customerTokenRepository from "../../repositories/customerTokenRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type ActiveAccountRequest =
{
	token: string;
	active: string;
	id: string;
}

class ActiveAccountClientService
{
	public async execute({ token, active, id }: ActiveAccountRequest): Promise<object | string>
	{
		const validUserToken = await customerTokenRepository.findOneBy({ token });
		if(!validUserToken) {
			throw new BadRequestError('Token não encontrado.');
		}

		const userExists = await customerRepository.findOneBy(validUserToken.customer);
		if(!userExists) {
			throw new BadRequestError('Cliente não cadastrado.');
		}

		userExists.activated = Number(active);
		userExists.activated_on = new Date();

		try {
			await customerRepository.save(userExists);
			return { message: 'Conta ativada.', userId: id };
		} catch(error) {
			throw new BadRequestError('Error' + error);
		}
	}
}

export default ActiveAccountClientService;
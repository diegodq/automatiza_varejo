import customerRepository from "../../repositories/customerRepository";
import customerTokenRepository from "../../repositories/customerTokenRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type ActiveAccountRequest =
{
	token: string;
	id: string;
}

class ActiveAccountClientService
{
	public async execute({ token, id }: ActiveAccountRequest): Promise<object | string>
	{
		const activate = 1;

		const validUserToken = await customerTokenRepository.findOneBy({ token });
		if(!validUserToken) {
			throw new BadRequestError('Token não encontrado.');
		}

		const userExists = await customerRepository.findOneBy(validUserToken.customer);
		if(!userExists) {
			throw new BadRequestError('Cliente não cadastrado.');
		}

		userExists.activated = activate;
		userExists.activated_on = new Date();
		const clientActivated = await customerRepository.save(userExists);

		if(!clientActivated.activated)
			throw new BadRequestError('Conta não ativada.');
		else
			return { message: 'Conta não ativada.', userId: id }
	}
}

export default ActiveAccountClientService;
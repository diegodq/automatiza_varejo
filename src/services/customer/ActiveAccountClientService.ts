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
		const validUserToken = await customerTokenRepository.findOneBy({ token });
		if(!validUserToken) {
			throw new BadRequestError('Token não encontrado.');
		}

		const userExists = await customerRepository.findOneBy({ id: Number(id) });
		if(!userExists) {
			throw new BadRequestError('Cliente não cadastrado.');
		}

		userExists.activated = 1;
		userExists.activated_on = new Date();

		const active = await customerRepository.save(userExists);
		if(active.activated == 0) {
			throw new BadRequestError('Conta não ativada.');
		}

		return { status: 'success', message: 'Conta ativada.', userId: id };
	}
}

export default ActiveAccountClientService;
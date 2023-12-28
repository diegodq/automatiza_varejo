import customerRepository from "../../repositories/customerRepository";
import customerTokenRepository from "../../repositories/customerTokenRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Customer from '../../entities/Customer';
import CustomerTokens from '../../entities/CustomerTokens';

type ActiveAccountRequest =
{
	token: string;
	id: string;
}

class ActiveAccountClientService
{
	public async execute({ token, id }: ActiveAccountRequest): Promise<object | string>
	{
		const validUserToken: CustomerTokens | null = await customerTokenRepository.findOneBy({ token });
		if(!validUserToken) {
			throw new BadRequestError('Token não encontrado.');
		}

		const userExists: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
		if(!userExists) {
			throw new BadRequestError('Cliente não cadastrado.');
		}

		if(!userExists.getTempEmail) {
			userExists.activated = 1;
			userExists.activated_on = new Date();

			await customerRepository.save(userExists);

			return { status: 'success', message: 'Conta ativada.' };
		}

		userExists.email = userExists.getTempEmail;
		userExists.temp_email = '';
		userExists.email_change_on = new Date();

		await customerRepository.save(userExists);

		return { status: 'success', message: 'email ativado.' };
	}
}

export default ActiveAccountClientService;
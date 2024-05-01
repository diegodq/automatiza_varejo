import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import customerRepository from "../../repositories/customerRepository";
import paramsConfig from "../../params/paramsConfig";
import { BadRequestError, UnauthorizedError } from "../../utils/ApiErrors";
import Customer from '../../entities/Customer';

type RequestSession =
{
	email: string,
	password: string
}

class CreateSessionCustomerService
{
	public async execute({ email, password }: RequestSession): Promise<object>
	{
		const customer: Customer | null = await customerRepository.findOne({ where: { email } });

		if(!customer) {
			throw new UnauthorizedError('Email ou Senha incorretos.');
		}

		if (customer.change_password == 1)
			throw new BadRequestError('change-password');

		if(customer.activated == 0)
			throw new BadRequestError('Cliente inativado.');

		const passwordChecked: boolean = await compare(password, customer.password);
		if (!passwordChecked)
			throw new UnauthorizedError('Email ou Senha incorretos.');

		const token: string = sign({}, paramsConfig.jwt.secret, {
			// subject: `${String(customer.id)}, ${customer.type_customer}`,
			subject: String(customer.id),
			expiresIn: paramsConfig.jwt.expiresIn
		})

		return { token: token, customerId: customer.getId }
	}
}

export default CreateSessionCustomerService;
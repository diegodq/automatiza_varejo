import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import customerRepository from "../../repositories/customerRepository";
import paramsConfig from "../../params/paramsConfig";
import appDataSource from "../../data-source";
import Company from "../../entities/Company";
import { BadRequestError, UnauthorizedError } from "../../utils/ApiErrors";

type RequestSession =
{
	email: string,
	password: string
}

class CreateSessionCustomerService
{
	public async execute({ email, password }: RequestSession): Promise<string | object>

	{
		const customer = await customerRepository.findOne({ where: { email } });

		if(!customer) {
			throw new UnauthorizedError('Email ou Senha incorretos.');
		}

		if(customer.activated == 0) {
			throw new BadRequestError('Cliente inativado.');
		}

		const passwordChecked = await compare(password, customer.password);
		if (!passwordChecked) {
			throw new UnauthorizedError('Email ou Senha incorretos.');
		}

		const token = sign({}, paramsConfig.jwt.secret, {
			subject: String(customer.id),
			expiresIn: paramsConfig.jwt.expiresIn
		})

		const idCustomer = customer.id;
		const customerHasCompany = await appDataSource.getRepository(Company)
		.createQueryBuilder('company').where('company.customer = :id', { id: idCustomer }).getOne();
		if(!customerHasCompany) {
			return { status: 'no-company', token: token, customerId: idCustomer };
		}

		return { token: token }
	}
}

export default CreateSessionCustomerService;
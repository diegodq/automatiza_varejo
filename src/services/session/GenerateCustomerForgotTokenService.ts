import customerRepository from "../../repositories/customerRepository";
import customerTokenRepository from "../../repositories/customerTokenRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type RequestCustomer =
{
	email: string;
}

class GenerateCustomerForgotTokenService
{
	public async generate({ email }: RequestCustomer): Promise<string>
	{
		const customerExists = await customerRepository.findOneBy({ email });
		if(!customerExists) {
			throw new BadRequestError('Cliente não encontrado.');
		}

		const generatedToken = customerTokenRepository.create({ customer: customerExists });
		await customerTokenRepository.save(generatedToken);

		return generatedToken.token;
	}
}

export default GenerateCustomerForgotTokenService;
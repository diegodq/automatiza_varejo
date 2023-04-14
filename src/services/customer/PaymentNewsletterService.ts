import customerRepository from "src/repositories/customerRepository";
import { BadRequestError } from "src/utils/ApiErrors";

type RequestInfo =
{
	id: string;
	accept_newsletter: number,
	info_payment: number
}

class PaymentNewsletterService
{
	public async execute({ id, accept_newsletter, info_payment }: RequestInfo): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		
		return '';
	}
}

export default PaymentNewsletterService;
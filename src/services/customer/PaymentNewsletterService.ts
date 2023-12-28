import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Customer from '../../entities/Customer';

type RequestInfo =
{
	id: string;
	accept_newsletter: string;
	info_payment: string;
}

class PaymentNewsletterService
{
	public async execute({ id, accept_newsletter, info_payment }: RequestInfo): Promise<object>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		customer.accept_newsletter = Number(accept_newsletter);
		customer.info_payment = Number(info_payment);

		await customerRepository.save(customer);

		let newsletter = null;
		let payment = null;

		newsletter = customer.accept_newsletter == 1;

		payment = customer.getInfoPayment == 1;

		return { accept_newsletter: newsletter, info_payment: payment }
	}
}

export default PaymentNewsletterService;
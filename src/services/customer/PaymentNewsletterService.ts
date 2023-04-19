import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

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
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		customer.accept_newsletter = Number(accept_newsletter);
		customer.info_payment = Number(info_payment);

		await customerRepository.save(customer);

		let newsletter = null;
		let payment = null;

		if(customer.accept_newsletter == 1) {
			newsletter = true;
		} else {
			newsletter = false;
		}

		if(customer.getInfoPayment == 1) {
			payment = true;
		} else {
			payment = false;
		}

		return { accept_newsletter: newsletter, info_payment: payment }
	}
}

export default PaymentNewsletterService;
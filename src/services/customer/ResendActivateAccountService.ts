import path from "path";
import { BadRequestError } from "../../utils/ApiErrors";
import customerRepository from "../../repositories/customerRepository";
import Mailer from "../../configurations/mailer/Mailer";
import GenerateCustomerForgotTokenService from "../session/GenerateCustomerForgotTokenService";
import Customer from '../../entities/Customer';

type ResendType =
{
	email: string;
}

class ResendActivateAccountService
{
	public async execute({ email }: ResendType): Promise<string>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ email });
		if(!customer) {
			throw new BadRequestError('no-customer');
		}

		if(customer.activated == 1) {
			throw new BadRequestError('Conta já está ativada');
		}

		customer.resent_email_on = new Date();
		await customerRepository.save(customer);

		const generateCustomerForgotTokenService: GenerateCustomerForgotTokenService = new GenerateCustomerForgotTokenService();
		const token: string = await generateCustomerForgotTokenService.generate({ email });

		const forgotPasswordTemplate: string = path.resolve(__dirname, '..', '..', 'notifications', 'verify-email.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Fácil',
				email: 'noreply@automatizafacil.com.br'
			},
			to: {
				name: customer.first_name,
				email: email
			},
			subject: 'BEM-VINDO À AUTOMATIZA VAREJO!',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: customer.first_name,
					link: (process.env.APP_MODE == 'development') ? `http://localhost:3002/active-customer?token=${token}&id=${customer.id}` : `https://app.automatizafacil.com.br/active-customer?token=${token}&id=${customer.id}`,
				}
			}
		});

		return `Enviamos um e-mail com link de ativação para ${email}. Ative seu cadastro clicando no link enviado.`;
	}
}

export default ResendActivateAccountService;
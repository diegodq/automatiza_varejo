import path from "path";
import { hash } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import Company from "../../entities/Company";
import GenerateCustomerForgotTokenService from "../session/GenerateCustomerForgotTokenService";
import Mailer from "../../configurations/mailer/Mailer";
import Customer from "../../entities/Customer";
import libMail from "../../lib/libMail";
import paramsConfig from "../../params/paramsConfig";
import { BadRequestError } from "../../utils/ApiErrors";

type TypeRequest =
{
	first_name: string,
	surname: string,
	position: string,
	phone: string,
	email: string,
	password: string,
	accept_terms: string,
	company?: Company
}

class CreateCustomerService
{
	public async execute({ first_name, surname, position, phone, email, password, accept_terms, company }: TypeRequest): Promise<string | object>
	{
		const emailCustomer: Customer | null = await customerRepository.findOneBy({ email });
		if(emailCustomer) {
			throw new BadRequestError('customer-already-registered');
		}

		const hashedPassword: string = await hash(password, 8);

		const newCustomer: Customer = customerRepository.create({ first_name, surname, position, phone, email,
			old_password: hashedPassword, password: hashedPassword, accept_terms, company });

		newCustomer.accept_terms_on = new Date();
		await customerRepository.save(newCustomer);

		if(process.env.APP_MODE == 'development')
			return { status: 'success', message: 'Development mode activated. In this mode email not sended. Please, active this client manually.' };
		else {
			const generateCustomerForgotTokenService: GenerateCustomerForgotTokenService = new GenerateCustomerForgotTokenService();
			const token: string = await generateCustomerForgotTokenService.generate({ email });

			if(paramsConfig.params.useQueueForSendNotifications) {
				const user = { first_name, email, token, newCustomer };

				await libMail.add({ user });
			} else {
				await this.sendNotificationWithoutQueue({ first_name, email, token, newCustomer });
			}

			return `Enviamos um e-mail com link de ativação para ${email}. Ative seu cadastro clicando no link enviado.`;
		}
	}

	private async sendNotificationWithoutQueue({ first_name, email, token, newCustomer }: any)
	{
		const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'notifications', 'verify-email.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Varejo',
				email: 'noreply@automatizavarejo.com.br'
			},
			to: {
				name: first_name,
				email: email
			},
			subject: 'BEM-VINDO À AUTOMATIZA VAREJO!',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: first_name,
					link: `https://app.automatizavarejo.com.br/active-customer?token=${token}&id=${newCustomer.id}`,
				}
			}
		});
	}
}

export default CreateCustomerService;
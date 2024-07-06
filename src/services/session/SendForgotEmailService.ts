import path from 'path';
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Mailer from "../../configurations/mailer/Mailer";
import GenerateCustomerForgotTokenService from "./GenerateCustomerForgotTokenService";
import Customer from '../../entities/Customer';

type RequestUser =
{
	email: string;
}

class SendForgotEmailService
{
	public async execute({ email }: RequestUser): Promise<any>
	{
		const user: Customer | null = await customerRepository.findOneBy({ email });
		if (!user) {
			throw new BadRequestError('Usuário não encontrado.');
		}

		const generateCustomerForgotTokenService: GenerateCustomerForgotTokenService = new GenerateCustomerForgotTokenService();
		const token: string = await generateCustomerForgotTokenService.generate({ email });

		const forgotPasswordTemplate: string = path.resolve(__dirname, '..', '..', 'notifications', 'password-reset.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Fácil',
				email: 'noreply@automatizafacil.com.br'
			},
			to: {
				name: user.first_name,
				email: user.email
			},
			subject: 'Recuperação de senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.first_name,
					link: (process.env.APP_MODE == 'development') ? `http://localhost:3002/new-password?token=${token}&id=${user.getId}` : `https://app.automatizafacil.com.br/new-password?token=${token}&id=${user.getId}`,
				}
			}
		});

		return `Email enviado.`;
	}
}

export default SendForgotEmailService;
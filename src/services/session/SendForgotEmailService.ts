import path from 'path';
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Mailer from "../../configurations/mailer/Mailer";
import GenerateCustomerForgotTokenService from "./GenerateCustomerForgotTokenService";

type RequestUser =
{
	email: string;
}

class SendForgotEmailService
{
	public async execute({ email }: RequestUser): Promise<any>
	{
		const user = await customerRepository.findOneBy({ email });
		if (!user) {
			throw new BadRequestError('Usuário não encontrado.');
		}

		const generateCustomerForgotTokenService = new GenerateCustomerForgotTokenService();
		const token = await generateCustomerForgotTokenService.generate({ email });

		const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'notifications', 'password-reset.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Varejo',
				email: 'noreply@automatizavarejo.com.br'
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
					link: `https://app.automatizavarejo.com.br/new-password?token=${token}`,
				}
			}
		});

		return `Enviamos um e-mail para ${user.email} com link de reset de senha. Altere sua senha clicando no link enviado.`;
	}
}

export default SendForgotEmailService;
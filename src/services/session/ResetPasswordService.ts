import 'dotenv/config';
import path from 'path';
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import customerTokenRepository from "../../repositories/customerTokenRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Mailer from '../../configurations/mailer/Mailer';

type RequestCustomer =
{
	token: string;
	new_password: string;
}

class ResetPasswordService
{
	public async execute({ token, new_password }: RequestCustomer): Promise<string>
	{
		const validUserToken = await customerTokenRepository.findOneBy({ token });
		if(!validUserToken) {
			throw new BadRequestError('Token não encontrado.');
		}

		const userExists = await customerRepository.findOneBy(validUserToken.customer);
		console.log(userExists?.id);
		if(!userExists) {
			throw new BadRequestError('Cliente não cadastrado.');
		}

		const compareDate = addHours(validUserToken.created_at, 2);
		if(isAfter(Date.now(), compareDate)) {
			throw new BadRequestError('Token expirado.');
		}

		userExists.password = await hash(new_password, 8);
		await customerRepository.save(userExists);

		const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'notifications', 'password-change.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Varejo',
				email: 'noreply@automatizavarejo.com.br'
			},
			to: {
				name: userExists.first_name,
				email: userExists.email
			},
			subject: 'Recuperação de senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: userExists.first_name,
					operatingSystem: userExists.system_user,
				}
			}
		});

		return 'Senha alterada.';
	}
}

export default ResetPasswordService;
import { compare } from "bcryptjs";
import path from "path";
import moment from "moment";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Mailer from "../../configurations/mailer/Mailer";
import GenerateCustomerForgotTokenService from "../session/GenerateCustomerForgotTokenService";
moment.locale('pt-br');

type UpdateRequest =
{
	id: string;
	password: string;
	new_email: string;
	agent_user: string;
	system_user: string;
	city: string;
	country_name: string;
	country_capital: string;
}

class UpdateEmailCustomer
{
	public async execute({ id, password, new_email, agent_user, system_user, city, country_name, country_capital }: UpdateRequest): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Usuário não existe');
		}

		const comparePassword = await compare(password, customer.password);
		if(!comparePassword) {
			throw new BadRequestError('Senha incorreta.');
		}

		if (customer.email == new_email) {
			throw new BadRequestError('Usuário já está cadastrado.');
		}

		customer.temp_email = new_email;
		customer.email_change_on = new Date();
		customer.agent_user = agent_user;
		customer.system_user = system_user;
		customer.city = city;
		customer.country_name = country_name;
		customer.country_capital = country_capital;

		await customerRepository.save(customer);

		const generateCustomerForgotTokenService = new GenerateCustomerForgotTokenService();
		const email = customer.email;
		const token = await generateCustomerForgotTokenService.generate({ email });

		const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'notifications', 'email-change.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Varejo',
				email: 'noreply@automatizavarejo.com.br'
			},
			to: {
				name: customer.first_name,
				email: customer.temp_email
			},
			subject: 'Troca de E-mail',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: customer.first_name,
					city: customer.city,
					agentUser: customer.agent_user,
					systemUser: customer.system_user,
					regionName: customer.country_name,
					country: customer.country_capital,
					dateTime: moment(customer.email_change_on).format('MMMM DD-MM-YYYY HH:mm:ss'),
					link: `https://app.automatizavarejo.com.br/active-customer?token=${token}&id=${customer.id}`,
				}
			}
		});

		return 'E-mail atualizado';
	}
}

export default UpdateEmailCustomer;
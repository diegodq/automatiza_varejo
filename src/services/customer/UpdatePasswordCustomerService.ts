import path from "path";
import moment from "moment";
import { hash, compare } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Mailer from "../../configurations/mailer/Mailer";
import Customer from '../../entities/Customer';
moment.locale('pt-br');

type UpdateRequest =
{
	id: string;
	old_password: string;
	password: string;
	agent_user: string;
	system_user: string;
	city_locate: string;
	country_name: string;
	country_capital: string;
}

class UpdatePasswordCustomer
{
	public async execute({ id, old_password, password, agent_user, system_user, city_locate, country_name, country_capital }: UpdateRequest): Promise<string>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('no-customer');
		}

		const verifyPassword: boolean = await compare(old_password, customer.password);
		if(!verifyPassword) {
			throw new BadRequestError('Senha antiga desconhecida.');
		}

		const newPassword: string = await hash(password, 8);

		customer.old_password = newPassword;
		customer.password = newPassword;
		customer.city_locate = city_locate;
		customer.agent_user = agent_user;
		customer.system_user = system_user;
		customer.country_name = country_name;
		(customer.change_password == 1) ? customer.change_password = 0 : customer.change_password = 0;
		customer.country_capital = country_capital;
		customer.pass_change_on = new Date();

		await customerRepository.save(customer);

		const forgotPasswordTemplate: string = path.resolve(__dirname, '..', '..', 'notifications', 'password-change.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Varejo',
				email: 'noreply@automatizavarejo.com.br'
			},
			to: {
				name: customer.first_name,
				email: customer.email
			},
			subject: 'Atualização de Senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: customer.first_name,
					city: customer.city_locate,
					agentUser: customer.agent_user,
					systemUser: customer.system_user,
					regionName: customer.country_name,
					country: customer.country_capital,
					dateTime: moment(customer.pass_change_on).format('MMMM DD-MM-YYYY HH:mm:ss')
				}
			}
		});

		return 'Senha atualizada.';
	}
}

export default UpdatePasswordCustomer;
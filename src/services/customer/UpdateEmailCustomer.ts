import { compare } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Mailer from "src/configurations/mailer/Mailer";
import path from "path";
import moment from "moment";
moment.locale('pt-br');

type UpdateRequest =
{
	id: string;
	password: string;
	email: string;
	agent_user: string;
	system_user: string;
	city: string;
	region_name: string;
	country: string;
}

class UpdateEmailCustomer
{
	public async execute({ id, password, email, agent_user, system_user, city, region_name, country }: UpdateRequest): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Usuário não existe');
		}

		const comparePassword = await compare(password, customer.password);
		if(!comparePassword) {
			throw new BadRequestError('Senha incorreta.');
		}

		const emailExists = await customerRepository.findOneBy({ email  });
		if(emailExists) {
			throw new BadRequestError('Um usuário com este email já está cadastrado.');
		}

		if (customer.email == email) {
			throw new BadRequestError('Usuário já está cadastrado.');
		}

		customer.email = email;
		customer.email_change_on = new Date();
		customer.agent_user = agent_user;
		customer.system_user = system_user;
		customer.city = city;
		customer.region_name = region_name;
		customer.country = country;

		await customerRepository.save(customer);

		const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'notifications', 'email-change.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Varejo',
				email: 'noreply@automatizavarejo.com.br'
			},
			to: {
				name: customer.first_name,
				email: customer.email
			},
			subject: 'Troca de E-mail',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: customer.first_name,
					city: customer.city,
					agentUser: customer.agent_user,
					systemUser: customer.system_user,
					regionName: customer.region_name,
					country: customer.country,
					dateTime: moment(customer.pass_change_on).format('MMMM DD-MM-YYYY HH:mm:ss')
				}
			}
		});

		return 'E-mail atualizado';
	}
}

export default UpdateEmailCustomer;
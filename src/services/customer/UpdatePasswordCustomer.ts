import 'dotenv/config';
import { hash, compare } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import path from "path";
import Mailer from "../../configurations/mailer/Mailer";
import moment from "moment";

type UpdateRequest =
{
	id: string;
	old_password: string;
	password: string;
	city: string;
	region_name: string;
	country: string;
}

class UpdatePasswordCustomer
{
	public async execute({ id, old_password, password, city, region_name, country }: UpdateRequest): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Cliente não cadastrado.');
		}

		const verifyPassword = await compare(old_password, customer.password);
		if(!verifyPassword) {
			throw new BadRequestError('Senha antiga desconhecida.');
		}

		const newPassword = await hash(password, 8);

		customer.old_password = newPassword;
		customer.password = newPassword;
		customer.city = city;
		customer.region_name = region_name;
		customer.country = country;
		customer.pass_change_on = new Date();

		await customerRepository.save(customer);

		const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'notifications', 'password-change.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Varejo',
				email: 'noreply@automatizavarejo.com.br'
			},
			to: {
				name: customer.first_name,
				email: customer.email
			},
			subject: 'Recuperação de senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: customer.first_name,
					city: customer.city,
					regionName: customer.region_name,
					country: customer.country,
					dateTime: moment(customer.pass_change_on).format('MMMM Do YYYY, h:mm:ss a')
				}
			}
		});

		return 'Senha atualizada.';
	}
}

export default UpdatePasswordCustomer;
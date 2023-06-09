import path from "path";
import { hash } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import appDataSource from "../../data-source";
import Company from "../../entities/Company";
import GenerateCustomerForgotTokenService from "../session/GenerateCustomerForgotTokenService";
import Mailer from "../../configurations/mailer/Mailer";

type TypeRequest =
{
	first_name: string,
	surname: string,
	position: string,
	phone: string,
	email: string,
	password: string,
	accept_terms: string
}

class CreateCustomerService
{
	public async execute({ first_name, surname, position, phone,
		email, password, accept_terms }: TypeRequest): Promise<string | object>
	{
		const emailCustomer = await customerRepository.findOneBy({ email });

		if(emailCustomer) {
			const idCustomer = emailCustomer.getId;

			const customerHasCompany = await appDataSource.getRepository(Company).createQueryBuilder('company')
			.where('company.customer = :id', { id: idCustomer }).getOne();
			if(!customerHasCompany) {
				return { status: 'warn', message: 'no-company',
				data: idCustomer };
			}
		}

		const hashedPassword = await hash(password, 8);

		const newCustomer = customerRepository.create({ first_name, surname, position, phone, email,
			old_password: hashedPassword, password: hashedPassword, accept_terms });

		newCustomer.accept_terms_on = new Date();
		await customerRepository.save(newCustomer);

		const generateCustomerForgotTokenService = new GenerateCustomerForgotTokenService();
		const token = await generateCustomerForgotTokenService.generate({ email });

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

		return `Enviamos um e-mail com link de ativação para ${email}. Ative seu cadastro clicando no link enviado.`;
	}
}

export default CreateCustomerService;
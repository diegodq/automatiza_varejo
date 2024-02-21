import path from "path";
import { hash } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import Company from "../../entities/Company";
import GenerateCustomerForgotTokenService from "../session/GenerateCustomerForgotTokenService";
import Mailer from "../../configurations/mailer/Mailer";
import Customer from "../../entities/Customer";
import paramsConfig from "../../params/paramsConfig";
import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";
import { libCreateAccountMail } from "../../lib/libMail";

type TypeRequest =
{
	first_name: string,
	surname: string,
	position: string,
	phone: string,
	email: string,
	password: string,
	accept_terms: string,
	role_id: number;
	company?: Company
}

class CreateCustomerService
{
	public async execute({ first_name, surname, position, phone, email, password, accept_terms, company, role_id }: TypeRequest): Promise<string | object>
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

		await this.joinRoleToCustomer(role_id, newCustomer.id);

		const generateCustomerForgotTokenService: GenerateCustomerForgotTokenService = new GenerateCustomerForgotTokenService();
		const token: string = await generateCustomerForgotTokenService.generate({ email });

		if(paramsConfig.params.useQueueForSendNotifications) {
			const user = { first_name, email, token, newCustomer };
			await libCreateAccountMail.add({ user });
		} else {
			await this.sendNotificationWithoutQueue({ first_name, email, token, newCustomer });
		}

		return `Enviamos um e-mail com link de ativação para ${email}. Ative seu cadastro clicando no link enviado.`;
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

	private async joinRoleToCustomer(role_id: number, customer_id: number): Promise<void>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into roles_customer (role_id, customer_id) values (?, ?);`, [role_id, customer_id]);

		await queryRunner.release();
	}
}

export default CreateCustomerService;
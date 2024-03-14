import { QueryRunner } from 'typeorm';
import path from "path";
import { hash } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
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
	company_id: number
}

class CreateCustomerService
{
	public async execute({ first_name, surname, position, phone, email, password, accept_terms, company_id, role_id }: TypeRequest): Promise<string | object>
	{
		const emailCustomer: Customer | null = await customerRepository.findOneBy({ email });
		if(emailCustomer)
			throw new BadRequestError('customer-already-registered');

		const hashedPassword: string = await hash(password, 8);

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into customer (first_name, surname, position, phone, email, old_password, password, accept_terms, accept_terms_on, company_id)
			values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
			`, [first_name, surname, position, phone, email, hashedPassword, hashedPassword, accept_terms, new Date(), company_id]);

		const lastId = await queryRunner.query(`SELECT LAST_INSERT_ID() as id;`);

		await queryRunner.release();

		let id = 0;
		lastId.forEach((lastId: {id: number}) => {
			id = lastId.id;
		})

		await this.joinRoleToCustomer(role_id, Number(id));

		await this.enablePathsToUser(role_id, Number(id));

		await this.enablePermissionsToCustomer(Number(id));

		const generateCustomerForgotTokenService: GenerateCustomerForgotTokenService = new GenerateCustomerForgotTokenService();
		const token: string = await generateCustomerForgotTokenService.generate({ email });

		// if(paramsConfig.params.useQueueForSendNotifications) {
		// 	const user = { first_name, email, token, id };
		// 	await libCreateAccountMail.add({ user });
		// } else {
		// 	await this.sendNotificationWithoutQueue({ first_name, email, token, id });
		// }

		return `Enviamos um e-mail com link de ativação para ${email}. Ative seu cadastro clicando no link enviado.`;
	}

	private async sendNotificationWithoutQueue({ first_name, email, token, newCustomer }: any): Promise<void>
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
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into roles_customer (role_id, customer_id) values (?, ?);`, [role_id, customer_id]);

		await queryRunner.release();
	}

	private async enablePathsToUser(role_id: number, customer_id: number): Promise<void>
	{
		if (role_id === 1 || role_id === 2) {
			const queryRunner: QueryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			await queryRunner.query(`insert into customer_paths (path_id, customer_id) values (11, ?);`, [customer_id]);

			await queryRunner.release();
		}

		if (role_id === 3) {
			const queryRunner: QueryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			for (let path_id = 2; path_id <= 10; path_id++) {
				await queryRunner.query(`insert into customer_paths (path_id, customer_id) values (?, ?);`, [path_id, customer_id]);
			}

			await queryRunner.release();
		}
	}

	private async enablePermissionsToCustomer(customer_id: number)
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		for (let permission_id = 1; permission_id <= 5; permission_id++) {
			await queryRunner.query(`insert into customer_permissions (customer_id, permission_id) values (?, ?);`, [customer_id, permission_id]);
		}

		await queryRunner.release();
	}
}

export default CreateCustomerService;
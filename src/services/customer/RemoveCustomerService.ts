import { compare } from "bcryptjs";
import path from "path";
import { FixedRole } from "../../utils/enums";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Mailer from "../../configurations/mailer/Mailer";
import Customer from '../../entities/Customer';
import appDataSource from '../../data-source';
import paramsConfig from "../../params/paramsConfig";
import { libDeleteAccountMail } from "../../lib/libMail";

type RequestCustomer =
{
	root: string;
	id?: number;
	email: string;
	password: string;
}

class RemoveCustomerService
{
	public async execute({ root, id, email, password }: RequestCustomer): Promise<string>
	{
		const customerId = Number(root);

		// root or manager remove another account
		if(await this.checkRootAccount(customerId) && id !== undefined) {
			const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
			if(!customer)
				throw new BadRequestError('customer-not-found');

			await this.deleteCustomer(customer);

			return 'customer-removed';
		}

		// root account delete all
		if(await this.checkRootAccount(customerId) && id === undefined) {
			const customer: Customer | null = await customerRepository.findOneBy({ id: Number(customerId) });
			if(!customer)
				throw new BadRequestError('customer-not-found');

			if(customer.email != email)
				throw new BadRequestError('incorrect-email-or-password');

			const passwordCheck: boolean = await compare(password, customer.password);
			if(!passwordCheck)
				throw new BadRequestError('incorrect-email-or-password');

			const customer_id = customer.id;
			const company_id = await this.findCompanyByUser(customer.id);

			if(paramsConfig.params.useQueueForSendNotifications) {
				const user = { customer };
				await libDeleteAccountMail.add({ user });
			} else {
				const accountRemoved: string = path.resolve(__dirname, '..', '..', 'notifications', 'account-removed.hbs');

				await Mailer.sendMail({
					from: {
						name: 'Equipe Automatiza Fácil',
						email: 'contato@automatizafacil.com.br'
					},
					to: {
						name: customer.first_name,
						email: customer.email
					},
					subject: 'Exclusão de conta',
					templateData: {
						file: accountRemoved,
						variables: {}
					}
				});
			}

			await this.deleteCustomersAndCompany(customer_id, company_id);

			return 'account-removed';
		}

		// other user remove yourself
		if(await this.checkRemoveYourSelf(customerId)) {
			const customer: Customer | null = await customerRepository.findOneBy({ id: Number(customerId) });
			if(!customer)
				throw new BadRequestError('customer-not-found');

			if(customer.email != email)
				throw new BadRequestError('do-not-registered-customer.');

			const passwordCheck: boolean = await compare(password, customer.password);
			if(!passwordCheck)
				throw new BadRequestError('incorrect-email-or-password');

			await this.deleteCustomer(customer);

			return 'customer-removed';
		}

		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer)
			throw new BadRequestError('customer-not-found');

		await this.deleteCustomer(customer);

		return 'customer-removed';
	}

	private async findCompanyByUser(customer: number)
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select company.id from company
		join customer on company.id = customer.company_id where customer.id = ?;`, [customer]);

		await queryRunner.release();

		let companyId = 0;
		queryResult.forEach((item: { id: any; }) => {
			companyId = item.id;
		});

		return companyId;
	}

	private async deleteCustomersAndCompany(customer_id: number, company_id: number): Promise<void>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`call remove_companies_and_users(?, ?);`, [customer_id, company_id]);

		await queryRunner.release();
	}

	private async deleteCustomer(customer: Customer): Promise<void>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`call remove_user(?);`, [customer.id]);

		await queryRunner.release();
	}

	public async checkRootAccount(rootId: number): Promise<boolean>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select roles_customer.role_id from roles_customer
		where roles_customer.customer_id = ?;`, [rootId]);

		await queryRunner.release();

		let isRoot = false;
		queryResult.forEach((role: {role_id: number}) => {
			if(role.role_id === FixedRole.ADMINISTRATOR || role.role_id === FixedRole.GERENTE)
				isRoot = true;
		});

		return isRoot;
	}

	private async checkRemoveYourSelf(customerId: number): Promise<boolean>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select customer.id from customer where customer.id = ?;`, [customerId]);

		await queryRunner.release();

		let idCustomer = false;
		queryResult.forEach((customer: {id: number}) => {
			if(customer.id === customerId)
				idCustomer = true;
		});

		return idCustomer;
	}
}

export default RemoveCustomerService;
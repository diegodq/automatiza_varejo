import { compare } from "bcryptjs";
import path from "path";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Mailer from "../../configurations/mailer/Mailer";
import Customer from '../../entities/Customer';
import appDataSource from "../../data-source";
import { QueryRunner } from "typeorm";

type RequestCustomer =
{
	id: number;
	email: string;
	password: string;
}

type TypeCustomer = {
	type_customer: string;
}

class RemoveCustomerService
{
	public async execute({ id, email, password }: RequestCustomer): Promise<string>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		const passwordCheck: boolean = await compare(password, customer.password);
		if(customer.email != email) {
			throw new BadRequestError('Senha ou email incorreto');
		}

		if(!passwordCheck) {
			throw new BadRequestError('Senha ou email incorreto');
		}

		if(await this.checkTypeOfCustomer(id) === 'ADMINISTRADOR') {
			await customerRepository.remove(customer);
			const accountRemoved: string = path.resolve(__dirname, '..', '..', 'notifications', 'account-removed.hbs');

			await Mailer.sendMail({
				from: {
					name: 'Equipe Automatiza Varejo',
					email: 'noreply@automatizavarejo.com.br'
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
		} else if(await this.checkTypeOfCustomer(id) !== 'ADMINISTRADOR') {
			await customerRepository.remove(customer);
			const accountRemoved: string = path.resolve(__dirname, '..', '..', 'notifications', 'user-account-removed.hbs');

			await Mailer.sendMail({
				from: {
					name: 'Equipe Automatiza Varejo',
					email: 'noreply@automatizavarejo.com.br'
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

		return 'Cliente removido.'
	}

	private async checkTypeOfCustomer(id: number): Promise<string>
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect()

		const queryResult = await queryRunner.query(`select type_customer.type_customer from customer
		left join type_customer on type_customer.id = customer.type_customer
		where customer.id = ?;`, [ id ]);

		await queryRunner.release();

		let typeOfCustomer = '';
		queryResult.forEach((item: TypeCustomer) => {
			typeOfCustomer = item.type_customer;
		});

		return typeOfCustomer;
	}
}

export default RemoveCustomerService;
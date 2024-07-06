import path from 'path';
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import customerTokenRepository from "../../repositories/customerTokenRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Mailer from '../../configurations/mailer/Mailer';
import appDataSource from "../../data-source";
import CustomerTokens from '../../entities/CustomerTokens';
import { QueryRunner } from 'typeorm';
import Customer from '../../entities/Customer';

type RequestCustomer =
{
	token: string;
	new_password: string;
}

class ResetPasswordService
{
	public async execute({ token, new_password }: RequestCustomer): Promise<string>
	{
		const validUserToken: CustomerTokens | null = await customerTokenRepository.findOneBy({ token });
		if(!validUserToken) {
			throw new BadRequestError('Token não encontrado.');
		}

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();
		const result = await queryRunner.query(`select customer_id from customer_tokens where token = '${token}';`);
		await queryRunner.release();

		let id = 0;
		result.forEach((item: { customer_id: number}) => {
			id = item.customer_id;
		})

		console.log('id do token', id);

		const userExists: Customer | null = await customerRepository.findOneBy({ id });
		if(!userExists) {
			throw new BadRequestError('Cliente não cadastrado.');
		}

		const compareDate: Date = addHours(validUserToken.created_at, 2);
		if(isAfter(Date.now(), compareDate)) {
			throw new BadRequestError('Token expirado.');
		}

		const newPass: string = await hash(new_password, 8);

		const queryRunner2: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner2.connect();
		await queryRunner2.query(`update customer set password = '${newPass}' where id = '${id}';`);
		await queryRunner2.release();

		const forgotPasswordTemplate: string = path.resolve(__dirname, '..', '..', 'notifications', 'password-change.hbs');

		await Mailer.sendMail({
			from: {
				name: 'Equipe Automatiza Fácil',
				email: 'noreply@automatizafacil.com.br'
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
import { compare } from "bcryptjs";
import path from "path";
import Mailer from "src/configurations/mailer/Mailer";
import appDataSource from "src/data-source";
import Company from "src/entities/Company";
import customerRepository from "src/repositories/customerRepository";
import { BadRequestError } from "src/utils/ApiErrors";

type RequestRemove =
{
	id: string;
	email: string;
	password: string;
}

class RemoveAccountService
{
	public async execute({ id, email, password }: RequestRemove): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		const customerId = customer?.id;

		if(!customer) {
			throw new BadRequestError('Não há cliente cadastrado.');
		}

		const passwordCheck = await compare(password, customer.password);
		if(customer.email != email) {
			throw new BadRequestError('Senha ou email incorreto');
		}

		if(!passwordCheck) {
			throw new BadRequestError('Senha ou email incorreto');
		}

		await appDataSource.getRepository(Company).createQueryBuilder('company').delete()
		.where('company.customer_id = :id', { id: customerId }).execute();

		await customerRepository.remove(customer);

		const accountRemoved = path.resolve(__dirname, '..', '..', 'notifications', 'account-removed.hbs');

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

		return 'Conta removida';
	}
}

export default RemoveAccountService;
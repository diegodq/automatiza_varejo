import { BadRequestError } from "../../utils/ApiErrors";
import customerRepository from "../../repositories/customerRepository";
import Customer from '../../entities/Customer';
import appDataSource from "src/data-source";

type RequestCustomer =
{
	id: number;
}

class ShowDetailCustomerService
{
	public async execute({ id }: RequestCustomer): Promise<object>
	{
		const customer: Customer | null = await customerRepository.findOneBy({ id });
		if(!customer) {
			throw new BadRequestError('there-is-no-registered-client.')
		}

		const queryRunner = appDataSource.createQueryRunner();

		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select customer.id as user_id, company.id as company_id,
		customer.first_name, customer.avatar, customer.surname,
		customer.position, customer.phone, customer.activated, customer.activated_on,
		customer.accept_newsletter, customer.info_payment, customer.accept_terms,
		customer.accept_terms_on, customer.email, customer.temp_email, customer.email_change_on,
		customer.resent_email_on, customer.old_password, customer.password, customer.system_user,
		customer.agent_user, customer.pass_change_on, customer.city_locate, customer.country_name,
		customer.country_capital, company.corporate_name, company.fantasy_name, company.logo_company,
		company.cnpj, company.zip_code, company.state, company.address, company.number,
		company.complement, company.district, company.city, company.type_company from customer
		join company on company.id = customer.company_id where customer.id = ?;`, [id]);

		await queryRunner.release();

		return queryResult;
	}
}

export default ShowDetailCustomerService;
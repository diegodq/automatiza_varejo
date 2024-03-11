import appDataSource from '../../data-source';
import { QueryRunner } from 'typeorm';
import { BadRequestError } from '../../utils/ApiErrors';
import convertUserIdInCompanyId from '../../utils/convertUserIdInCompanyId';

type ListRequest =
{
	company: number
}

class ListCustomerByCompanyService
{
	public async execute({ company }: ListRequest): Promise<object>
	{
		const idCompany: number = await convertUserIdInCompanyId(Number(company));

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select customer.id, roles.name as role, customer.first_name, customer.surname,
		customer.position, customer.activated, customer.email, customer.avatar
		from customer join company on company.id = customer.company_id
		left join roles_customer on roles_customer.customer_id = customer.id
		left join roles on roles_customer.role_id = roles.id where customer.company_id = ?`, [idCompany]);

		await queryRunner.release();

		if(queryResult.length == 0)
			throw new BadRequestError('no-customer');

		if(process.env.APP_MODE == 'development') {
			queryResult.forEach((item: any) => {
				item.avatar = process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/avatar/' + item.avatar;
			});
		} else {
			queryResult.forEach((item: any) => {
				item.avatar = process.env.IMG_URL + '/avatar/' + item.avatar;
			});
		}

		return queryResult;
	}
}

export default ListCustomerByCompanyService;
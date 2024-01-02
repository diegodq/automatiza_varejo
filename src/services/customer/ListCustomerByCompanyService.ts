import appDataSource from '../../data-source';
import { QueryRunner } from 'typeorm';
import { BadRequestError } from '../../utils/ApiErrors';
import Company from '../../entities/Company';

type ListRequest =
{
	company: Company
}

class ListCustomerByCompanyService
{
	public async execute({ company }: ListRequest): Promise<object>
	{
		const companyId = Number(company);

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select company.fantasy_name, customer.id, customer.first_name,
		customer.surname, customer.position, customer.activated, customer.email, customer.type_customer,
		customer.avatar from customer join company on customer.company_id = company.id where company.id = ?`, [companyId]);

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
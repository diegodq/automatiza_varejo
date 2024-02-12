import appDataSource from '../../data-source';
import { QueryRunner } from 'typeorm';
import { BadRequestError } from '../../utils/ApiErrors';
import Company from '../../entities/Company';
import convertUserIdInCompanyId from '../../utils/convertUserIdInCompanyId';

type ListRequest =
{
	company: Company
}

class ListCustomerByCompanyService
{
	public async execute({ company }: ListRequest): Promise<object>
	{
		const idCustomer: number = await convertUserIdInCompanyId(Number(company));

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select customer.id, customer.company_id, customer.first_name, customer.surname,
		customer.position, customer.activated, customer.email from customer
		join company on company.id = customer.company_id where customer.company_id = ?;`, [idCustomer]);

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
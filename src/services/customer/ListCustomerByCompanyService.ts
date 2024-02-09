import appDataSource from '../../data-source';
import { QueryRunner } from 'typeorm';
import { BadRequestError } from '../../utils/ApiErrors';
import Company from '../../entities/Company';
import convertUserIdInCompanyId from '../../utils/convertUserIdInCompanyId';

type ListRequest =
{
	company: Company,
	idRoleNumber: number
}

class ListCustomerByCompanyService
{
	public async execute({ company }: ListRequest): Promise<object>
	{
		const idCustomer = await convertUserIdInCompanyId(Number(company));
		const idCompany = idCustomer;

		const idRoleNumber = await this.getRoleIdCustomer(idCustomer);

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select company.fantasy_name, customer.id, customer.first_name,
		customer.surname, customer.position, customer.activated, customer.email,
		customer.avatar, roles.name as role from customer join roles_customer
		on customer.id = roles_customer.customer join roles on roles.id = roles_customer.role
		join company on customer.company_id = company.id
		where customer.id = ? and roles.id = ? and company.id = ?;`, [idCustomer, idRoleNumber, idCompany]);

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

	private async getRoleIdCustomer(idCustomer: number): Promise<number>
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const getRoleId = await queryRunner.query(`select roles_customer.role from roles_customer
		where roles_customer.customer = ?;`,[idCustomer]);

		await queryRunner.release();

		const roleId = getRoleId.map((item: { role: number }) => {
			return item.role;
		});

		return roleId;
	}
}

export default ListCustomerByCompanyService;
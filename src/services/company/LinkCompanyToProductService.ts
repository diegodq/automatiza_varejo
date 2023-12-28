import appDataSource from '../../data-source';
import Company from "../../entities/Company";
import Product from "../../entities/Product";
import { QueryRunner } from 'typeorm';

type LinkRequest =
{
	company: Company;
	product: Product;
}

class LinkCompanyToProductService
{
	public async execute({ company, product }: LinkRequest): Promise<string>
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into company_product (company, product) values (${company}, ${product})`);

		await queryRunner.release();

		return 'link-done';
	}
}

export default LinkCompanyToProductService;
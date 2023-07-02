
import companyRepository from "../../repositories/companyRepository";
import productRepository from "../../repositories/productRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from '../../data-source';

type LinkRequest =
{
	company_id: number;
	product_id: number;
}

class LinkCompanyToProductService
{
	public async execute({ company_id, product_id }: LinkRequest)
	{
		const productExists = await productRepository.findOneBy({ id: product_id });
		if(!productExists) {
			throw new BadRequestError('product-does-not-exists');
		}

		const companyExists = await companyRepository.findOneBy({ id: company_id });
		if(!companyExists) {
			throw new BadRequestError('company-does-not-exists');
		}

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into product_company (product_id, company_id) values (${product_id}, ${company_id})`);

		await queryRunner.release();

		return 'linked-done';
	}
}

export default LinkCompanyToProductService;
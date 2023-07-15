import Company from "../../entities/Company";
import appDataSource from "../../data-source";
import productRepository from "../../repositories/productRepository";

interface RequestProduct
{
	name: string;
	description: string;
	company: Company;
}

class CreateProductService
{
	public async execute({ name, description, company }: RequestProduct): Promise<string>
	{
		const newProduct = productRepository.create({ name, description, company });
		await productRepository.save(newProduct);

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into params_product (product_id) values (${newProduct.getId});`);

		await queryRunner.release();

		return 'new-product-added';
	}
}

export default CreateProductService;
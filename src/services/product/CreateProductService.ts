import appDataSource from "../../data-source";
import productRepository from "../../repositories/productRepository";

interface RequestProduct
{
	name: string;
	description: string;
}

class CreateProductService
{
	public async execute({ name, description }: RequestProduct): Promise<string>
	{
		const newProduct = productRepository.create({ name, description });
		await productRepository.save(newProduct);

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into params_product (product_id) values (${newProduct.getId});`);

		await queryRunner.release();

		return 'new-product-added';
	}
}

export default CreateProductService;
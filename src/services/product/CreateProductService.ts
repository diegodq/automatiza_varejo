import Customer from "../../entities/Customer";
import productRepository from "../../repositories/productRepository";

interface RequestProduct
{
	name: string;
	description: string;
	customer: Customer
}

class CreateProductService
{
	public async execute({ name, description, customer }: RequestProduct): Promise<string>
	{
		const product = productRepository.create({ name, description, customer });
		await productRepository.save(product);
		return 'Novo produto adicionado.';
	}
}

export default CreateProductService;
import Product from "../../entities/Product";
import productRepository from "../../repositories/productRepository";

class ListProductService
{
	public async execute(): Promise<Product[]>
	{
		const products: Product[] = await productRepository.find();
		return products;
	}
}

export default ListProductService;
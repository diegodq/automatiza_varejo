import Product from "src/entities/Product";
import productRepository from "../../repositories/productRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type RequestBody =
{
	id: string;
	name: string;
	description: string
}

class UpdateProductService
{
	public async execute( { id, name, description }: RequestBody ): Promise<string>
	{
		const product: Product | null = await productRepository.findOneBy({ id: Number(id) });
		if(!product) {
			throw new BadRequestError('Produto não encontrado.');
		}

		product.name = name;
		product.description = description;

		await productRepository.save(product);
		return 'Produto atualizado';
	}
}

export default UpdateProductService;
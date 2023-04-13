import Product from "../../entities/Product";
import productRepository from "../../repositories/productRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type RequestProduct =
{
	id: string;
}

class ShowProductService
{
	public async execute({ id }: RequestProduct): Promise<Product | null>
	{
		const product = await productRepository.findOneBy({ id: Number(id) });
		if(!product) {
			throw new BadRequestError('Produto não cadastrado');
		}

		return product;
	}
}

export default ShowProductService;
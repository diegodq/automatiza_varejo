import paramsProductRepository from "../../repositories/paramsProductsRepository";
import Product from "../../entities/Product";
import productRepository from "../../repositories/productRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type paramsProduct =
{
	background_color: string,
	font_color: string,
	product: Product
}

class AddParamsProductService
{
	public async execute({ background_color, font_color, product  }: paramsProduct): Promise<string>
	{
		const productExists = await productRepository.findOneBy({ id: Number(product) });
		if(!productExists) {
			throw new BadRequestError('no-product');
		}

		const newParams = paramsProductRepository.create({ background_color, font_color, product });
		await paramsProductRepository.save(newParams);

		return 'params-added';
	}
}

export default AddParamsProductService;
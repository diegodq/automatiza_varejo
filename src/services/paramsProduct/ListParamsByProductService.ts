import paramsProductRepository from "../../repositories/paramsProductsRepository";
import productRepository from "../../repositories/productRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type ParamTypes =
{
	product_id: string;
}

class ListParamsByProductService
{
	public async execute({ product_id }: ParamTypes): Promise<object>
	{
		const id = Number(product_id);

		const productExists = await productRepository.findOneBy({ id: Number(product_id) });
		if(!productExists) {
			throw new BadRequestError('no-product');
		}

		const listParams = await paramsProductRepository.find({ where: { product: { id } } });
		if(!listParams) {
			throw new BadRequestError('no-params-products');
		}

		return listParams;
	}
}

export default ListParamsByProductService;
import { Response, Request } from 'express';
import CreateProductService from '../services/product/CreateProductService';
import ListProductByCompanyService from '../services/product/ListProductByCompanyService';

class ProductController
{
	static async addNewProduct(request: Request, response: Response): Promise<Response>
	{
		const { name, description } = request.body;

		const createProductService: CreateProductService = new CreateProductService();
		const newProduct: string = await createProductService.execute({ name, description });

		return response.status(200).json(newProduct);
	}

	static async listProducts(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const listProductByCompanyService: ListProductByCompanyService = new ListProductByCompanyService();
		const products: object | null = await listProductByCompanyService.execute({ company });

		return response.status(200).json({ status: 'success', products });
	}
}

export default ProductController;
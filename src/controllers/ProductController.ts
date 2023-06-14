import { Response, Request } from 'express';
import CreateProductService from '../services/product/CreateProductService';
import ListProductByCompanyService from '../services/product/ListProductByCompanyService';

class ProductController
{
	static async addNewProduct(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const { name, description } = request.body;

		const createProductService = new CreateProductService();
		const newProduct = await createProductService.execute({ name, description, company });

		return response.status(200).json({ status: 'success', message: newProduct });
	}

	static async listProducts(request: Request, response: Response)
	{
		const company = request.userId;

		const listProductByCompanyService = new ListProductByCompanyService();
		const products = await listProductByCompanyService.execute({ company });

		return response.status(200).json({ status: 'success', products });
	}
}

export default ProductController;
import { Response, Request } from 'express';
import CreateProductService from '../services/product/CreateProductService';
import ModifyAnchorQuestionService from "../services/anchorQuestion/AddAnchorQuestionService";
import ListProductByCompanyService from '../services/product/ListProductByCompanyService';
import ListAnchorQuestionService from '../services/anchorQuestion/ListAnchorQuestionService';

class ProductController
{
	static async addNewProduct(request: Request, response: Response): Promise<Response>
	{
		const { name, description } = request.body;

		const createProductService = new CreateProductService();
		const newProduct = await createProductService.execute({ name, description });

		return response.status(200).json(newProduct);
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
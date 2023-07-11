import { Response, Request } from 'express';
import CreateProductService from '../services/product/CreateProductService';
import ModifyAnchorQuestionService from "../services/paramsProduct/ModifyAnchorQuestionService";
import ListProductByCompanyService from '../services/product/ListProductByCompanyService';
import ListAnchorQuestionService from '../services/paramsProduct/ListAnchorQuestionService';

class ProductController
{
	static async addNewProduct(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;
		console.log(company);

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

	static async changeAnchorQuestion(request: Request, response: Response): Promise<Response>
	{
		const { id_product, anchor_question } = request.body;

		const modifyAnchorQuestionService = new ModifyAnchorQuestionService();
		const anchorQuestion = await modifyAnchorQuestionService.execute({ id_product, anchor_question });

		return response.status(200).json({ status: 'success', anchorQuestion: anchorQuestion });
	}

	static async listAnchorQuestion(request: Request, response: Response): Promise<Response>
	{
		const { product_id } = request.params;

		const listAnchorQuestion = new ListAnchorQuestionService();
		const anchorQuestion = await listAnchorQuestion.execute({ product_id });

		return response.status(200).json({ status: 'success', message: anchorQuestion });
	}
}

export default ProductController;
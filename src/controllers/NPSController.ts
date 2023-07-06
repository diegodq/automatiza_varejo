import { Request, Response } from "express";
import ListAnchorQuestionAndLogoClientService from "../services/nps/ListAnchorQuestionAndLogoClientService";
import ListQuestionAndParamsService from "../services/nps/ListQuestionAndParamsService";
import ListProductByCompanyService from "../services/nps/ListProductByCompanyService";

class NPSController
{
	static async listAnchorQuestionAndLogoClient(request: Request, response: Response): Promise<Response>
	{
		const { cnpj } = request.params;

		const listAnchorQuestionAndLogoClientService = new ListAnchorQuestionAndLogoClientService();
		const data = await listAnchorQuestionAndLogoClientService.execute({ cnpj });

		return response.status(200).json(data);
	}

	static async listQuestionAndParams(request: Request, response: Response): Promise<Response>
	{
		const { cnpj } = request.params;

		const listQuestionAndParamsService = new ListQuestionAndParamsService();
		const questionsByCompany = await listQuestionAndParamsService.execute({ cnpj });


		return response.status(200).json(questionsByCompany);
	}

	static async listProductByCompany(request: Request, response: Response): Promise<Response>
	{
		const { cnpj } = request.params;

		const listProductByCompany = new ListProductByCompanyService();
		const product = await listProductByCompany.execute({ cnpj });

		return response.status(200).json({ message: 'success', product });
	}
}

export default NPSController;
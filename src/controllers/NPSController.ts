import { Request, Response } from "express";
import ListAnchorQuestionAndLogoClientService from "../services/nps/ListAnchorQuestionAndLogoClientService";

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



		return response.status(200).json({});
	}
}

export default NPSController;
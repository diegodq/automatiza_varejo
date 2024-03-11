import { Request, Response } from "express";
import ListQuestionAndParamsService from "../services/nps/ListQuestionAndParamsService";
import ListProductByCompanyService from "../services/nps/ListProductByCompanyService";
import ListAnchorQuestionAndLogoClientService from "../services/nps/ListAnchorQuestionAndLogoClientService";
import ListTopicByCompany from "../services/nps/ListTopicByCompany";
import ListDepartmentsByCompany from "../services/nps/ListDepartmentsByCompany";

class NPSController
{
	static async listAnchorQuestionAndLogo(request: Request, response: Response): Promise<Response>
	{
		const { cnpj_company, ip_address, id_store } = request.params;

		const listAnchorAndLogoClient: ListAnchorQuestionAndLogoClientService = new ListAnchorQuestionAndLogoClientService();
		const data: object = await listAnchorAndLogoClient.execute({ cnpj_company, ip_address, id_store });

		return response.status(200).json(data);
	}

	static async listQuestionAndParams(request: Request, response: Response): Promise<Response>
	{
		const { cnpj_company } = request.params;

		const listQuestionAndParamsService: ListQuestionAndParamsService = new ListQuestionAndParamsService();
		const questionsByCompany: object = await listQuestionAndParamsService.execute({ cnpj_company });

		return response.status(200).json(questionsByCompany);
	}

	static async listProductByCompany(request: Request, response: Response): Promise<Response>
	{
		const { cnpj_company } = request.params;

		const listProductByCompany: ListProductByCompanyService = new ListProductByCompanyService();
		const product: object = await listProductByCompany.execute({ cnpj_company });
		return response.status(200).json({ message: 'success', product });
	}

	static async listTopicByCompany(request: Request, response: Response): Promise<Response>
	{
		const { cnpj_company } = request.params;

		const listTopicByCompany: ListTopicByCompany = new ListTopicByCompany();
		const topics: object = await listTopicByCompany.execute({ cnpj_company });

		return response.status(200).json(topics);
	}

	static async listDepartmentsByCompany(request: Request, response: Response): Promise<Response>
	{
		const { cnpj_company } = request.params;

		const listDepartmentsByCompany: ListDepartmentsByCompany = new ListDepartmentsByCompany();
		const departments: object = await listDepartmentsByCompany.execute({ cnpj_company });

		return response.status(200).json(departments);
	}
}

export default NPSController;
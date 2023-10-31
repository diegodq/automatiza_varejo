import { Request, Response } from "express";
import CreateCompanyService from "../services/company/CreateCompanyService";
import ListCompaniesService from "../services/company/ListCompaniesService";
import RemoveCompanyService from "../services/company/RemoveCompanyService";
import ShowCompanyService from "../services/company/ShowCompanyService";
import UpdateCompanyService from "../services/company/UpdateCompanyService";
import ListDepartmentsByCompanyService from "../services/department/ListDepartmentsByCompanyService";
import ListTopicsByCompanyService from "../services/company/ListTopicsByCompanyService";
import ListQuestionsByCompanyService from "../services/question/ListQuestionsByCompanyService";
import LinkCompanyToProductService from "../services/company/LinkCompanyToProductService";
import Company from "src/entities/Company";

class CompanyController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const customer = request.userId;

		const { corporate_name, fantasy_name, cnpj, zip_code, state, address, complement, number,
			district, city } = request.body;

		const createCompanyService = new CreateCompanyService();
		const newCompany = await createCompanyService.execute({ corporate_name, fantasy_name, cnpj, zip_code, state, address, complement, number,
			district, city, customer });

		return response.status(201).json(newCompany);
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const listCompanyService = new ListCompaniesService();
		const listCompanies: Company[] | null = await listCompanyService.execute();

		return response.status(200).json(listCompanies);
	}

	static async listDepartmentsByCompany(request: Request, response: Response)
	{
		const id = request.userId;

		const listDepartmentsByCompany = new ListDepartmentsByCompanyService();
		const departments = await listDepartmentsByCompany.execute({ id });

		return response.status(200).json(departments);
	}

	static async listTopicsByCompany(request: Request, response: Response)
	{
		const id = request.userId;

		const listTopicsByCompanyService = new ListTopicsByCompanyService();
		const topics = await listTopicsByCompanyService.execute({ id });

		return response.status(200).json(topics);
	}

	static async listQuestionByCompany(request: Request, response: Response)
	{
		const id = request.userId;

		const listQuestionsByCompanyService = new ListQuestionsByCompanyService();
		const listQuestion = await listQuestionsByCompanyService.execute({ id });

		return response.status(200).json(listQuestion);
	}

	static async show(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.params;

		const showCompanyService = new ShowCompanyService();
		const company = await showCompanyService.execute({ id });

		return response.status(200).json(company);
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const id = request.body.id;

		const removeCompanyService = new RemoveCompanyService();
		const companyRemoved = await removeCompanyService.execute(Number(id));

		return response.status(200).json({ status: 'success', message: companyRemoved });
	}

	static async update(request: Request, response: Response): Promise<Response>
	{
		const { id, corporate_name, fantasy_name, cnpj,
			zip_code, state, city, district, address, complement, number } = request.body;

		const updateCompanyService = new UpdateCompanyService();
		const updateCompany = await updateCompanyService.execute({ id, corporate_name, fantasy_name, cnpj,
			zip_code, state, city, district, address, complement, number });

		return response.status(200).json({ status: 'success', message: updateCompany });
	}

	static async linkCompanyToProduct(request: Request, response: Response)
	{
		const { company, product } = request.body;

		const linkCompanyToProductService = new LinkCompanyToProductService();
		const linked = await linkCompanyToProductService.execute({ company, product });

		return response.status(200).json({ status: 'success', message: linked })
	}


}

export default CompanyController;
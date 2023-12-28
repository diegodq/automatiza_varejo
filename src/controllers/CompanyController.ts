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
import Company from "../entities/Company";

class CompanyController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const customer = request.userId;

		const { corporate_name, fantasy_name, cnpj, zip_code, state, address, complement, number,
			district, city, type_company } = request.body;

		const createCompanyService: CreateCompanyService = new CreateCompanyService();
		const newCompany: object = await createCompanyService.execute({ corporate_name, fantasy_name, cnpj, zip_code, state, address, complement, number,
			district, city, type_company });

		return response.status(201).json(newCompany);
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const listCompanyService: ListCompaniesService = new ListCompaniesService();
		const listCompanies: Company[] | null = await listCompanyService.execute();

		return response.status(200).json(listCompanies);
	}

	static async listDepartmentsByCompany(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;

		const listDepartmentsByCompany: ListDepartmentsByCompanyService = new ListDepartmentsByCompanyService();
		const departments: object = await listDepartmentsByCompany.execute({ id });

		return response.status(200).json(departments);
	}

	static async listTopicsByCompany(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;

		const listTopicsByCompanyService: ListTopicsByCompanyService = new ListTopicsByCompanyService();
		const topics: object = await listTopicsByCompanyService.execute({ id });

		return response.status(200).json(topics);
	}

	static async listQuestionByCompany(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;

		const listQuestionsByCompanyService: ListQuestionsByCompanyService = new ListQuestionsByCompanyService();
		const listQuestion: object = await listQuestionsByCompanyService.execute({ id });

		return response.status(200).json(listQuestion);
	}

	static async show(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.params;

		const showCompanyService: ShowCompanyService = new ShowCompanyService();
		const company: Company | null = await showCompanyService.execute({ id });

		return response.status(200).json(company);
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const id = request.body.id;

		const removeCompanyService: RemoveCompanyService = new RemoveCompanyService();
		const companyRemoved: string = await removeCompanyService.execute(Number(id));

		return response.status(200).json({ status: 'success', message: companyRemoved });
	}

	static async update(request: Request, response: Response): Promise<Response>
	{
		const { id, corporate_name, fantasy_name, cnpj,
			zip_code, state, city, district, address, complement, number } = request.body;

		const updateCompanyService: UpdateCompanyService = new UpdateCompanyService();
		const updateCompany: string = await updateCompanyService.execute({ id, corporate_name, fantasy_name, cnpj,
			zip_code, state, city, district, address, complement, number });

		return response.status(200).json({ status: 'success', message: updateCompany });
	}

	static async linkCompanyToProduct(request: Request, response: Response): Promise<Response>
	{
		const { company, product } = request.body;

		const linkCompanyToProductService: LinkCompanyToProductService = new LinkCompanyToProductService();
		const linked: string = await linkCompanyToProductService.execute({ company, product });

		return response.status(200).json({ status: 'success', message: linked })
	}


}

export default CompanyController;
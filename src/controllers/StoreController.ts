import { Request, Response } from "express";
import Company from "../entities/Company";
import CreateNewStoreService from "../services/store/CreateNewStoreService";
import EditStoreService from "../services/store/EditStoreService";
import ListStoreByCompany from "../services/store/ListStoreByCompany";
import DisableStoreService from "../services/store/DisableStoreService";

class StoreController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const company: Company = request.userId;

		const { name, address } = request.body;

		const createNewStoreService = new CreateNewStoreService();
		const newStore: string = await createNewStoreService.execute({ name, address, company });

		return response.status(200).json(newStore);
	}

	static async editStore(request: Request, response: Response): Promise<Response>
	{
		const company: Company = request.userId;

		const { name, address } = request.body;

		const editStoreService = new EditStoreService();
		const editStore: string = await editStoreService.execute({ name, address, company });

		return response.status(200).json(editStore);
	}

	static async listStore(request: Request, response: Response): Promise<Response>
	{
		const company: number = request.userId;

		const listStoreByCompany = new ListStoreByCompany();
		const updateStore: object = await listStoreByCompany.execute({ company });

		return response.status(200).json(updateStore);
	}

	static async disableStore(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;
		const { status } = request.body;

		const disableStoreService = new DisableStoreService();
		const updateStore = await disableStoreService.execute({ status ,company });

		return response.status(200).json(updateStore);
	}
}

export default StoreController;
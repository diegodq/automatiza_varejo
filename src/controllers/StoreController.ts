import { Request, Response } from "express";
import Company from "../entities/Company";
import CreateNewStoreService from "../services/store/CreateNewStoreService";
import EditStoreService from "../services/store/EditStoreService";
import ListStoreByCompany from "../services/store/ListStoreByCompany";
import DisableStoreService from "../services/store/DisableStoreService";
import RemoveStoreService from "src/services/store/RemoveStoreService";

class StoreController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const company: Company = request.userId;

		const { name, address, store_number } = request.body;

		const createNewStoreService = new CreateNewStoreService();
		const newStore: string = await createNewStoreService.execute({ name, address, company, store_number });

		return response.status(200).json({ status: 'success', message: newStore });
	}

	static async editStore(request: Request, response: Response): Promise<Response>
	{
		const { id, name, address } = request.body;

		const editStoreService = new EditStoreService();
		const editStore: string = await editStoreService.execute({ id, name, address });

		return response.status(200).json({ status: 'success', message: editStore });
	}

	static async listStore(request: Request, response: Response): Promise<Response>
	{
		const company: number = request.userId;

		const listStoreByCompany = new ListStoreByCompany();
		const updateStore: object = await listStoreByCompany.execute({ company });

		return response.status(200).json({ status: 'success', message: updateStore });
	}

	static async removeStore(request: Request, response: Response): Promise<Response>
	{
		const { id_store } = request.body;

		const removeStoreService = new RemoveStoreService();
		const storeRemoved = await removeStoreService.execute(id_store);

		return response.status(200).json({ status: 'success', storeRemoved });
	}

	static async disableStore(request: Request, response: Response): Promise<Response>
	{
		const { status, store_number } = request.body;

		const disableStoreService = new DisableStoreService();
		const updateStore = await disableStoreService.execute({ status ,store_number });

		return response.status(200).json({ status: 'success', message: updateStore });
	}
}

export default StoreController;
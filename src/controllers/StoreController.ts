import { Request, Response } from "express";
import Company from "../entities/Company";
import CreateNewStoreService from "../services/store/CreateNewStoreService";
import EditStoreService from "../services/store/EditStoreService";
import ListStoreByCompany from "../services/store/ListStoreByCompany";
import DisableStoreService from "../services/store/DisableStoreService";
import RemoveStoreService from "../services/store/RemoveStoreService";
import GetInfoStoreService from "../services/store/GetInfoStoreService";
import ListStoreByCNPJ from "../services/store/ListStoreByCNPJ";

class StoreController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const company: Company = request.userId;

		const { name, address, store_number } = request.body;

		const createNewStoreService: CreateNewStoreService = new CreateNewStoreService();
		const newStore: string = await createNewStoreService.execute({ name, address, company, store_number });

		return response.status(200).json({ status: 'success', message: newStore });
	}

	static async editStore(request: Request, response: Response): Promise<Response>
	{
		const { id, name, address } = request.body;

		const editStoreService: EditStoreService = new EditStoreService();
		const editStore: string = await editStoreService.execute({ id, name, address });

		return response.status(200).json({ status: 'success', message: editStore });
	}

	static async listStore(request: Request, response: Response): Promise<Response>
	{
		const company: number = request.userId;

		const listStoreByCompany: ListStoreByCompany = new ListStoreByCompany();
		const listStore: object = await listStoreByCompany.execute({ company });

		return response.status(200).json({ status: 'success', message: listStore });
	}

	static async listStoreByCNPJ(request: Request, response: Response): Promise<Response>
	{
		const { cnpj } = request.params

		const listStoreByCNPJ: ListStoreByCNPJ = new ListStoreByCNPJ();
		const listStore: object = await listStoreByCNPJ.execute(cnpj);

		return response.status(200).json({ status: 'success', message: listStore });
	}

	static async removeStore(request: Request, response: Response): Promise<Response>
	{
		const { id_store } = request.body;

		const removeStoreService: RemoveStoreService = new RemoveStoreService();
		const storeRemoved: string = await removeStoreService.execute(id_store);

		return response.status(200).json({ status: 'success', storeRemoved });
	}

	static async disableStore(request: Request, response: Response): Promise<Response>
	{
		const { status, store_number } = request.body;

		const disableStoreService: DisableStoreService = new DisableStoreService();
		const updateStore: string = await disableStoreService.execute({ status ,store_number });

		return response.status(200).json({ status: 'success', message: updateStore });
	}

	static async getInfoStore(request: Request, response: Response): Promise<Response>
	{
		const { id_store } = request.params;

		const getInfoStoreService: GetInfoStoreService = new GetInfoStoreService();
		const infoStore: object = await getInfoStoreService.execute({ id_store });

		return response.status(200).json({status: 'success', message: infoStore});
	}
}

export default StoreController;
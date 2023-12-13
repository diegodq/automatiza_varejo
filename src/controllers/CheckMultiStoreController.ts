import { Request, Response } from 'express';
import CheckMultiStoreService from '../services/multiStore/CheckMultiStoreService';
import CheckMultiStoreByCNPJService from '../services/multiStore/CheckMultiStoreByCNPJService';

class CheckMultiStoreController
{
	static async checkIfExistsMultiStore(request: Request, response: Response): Promise<Response>
	{
		const companyId = request.userId;

		const checkMultiStoreService = new CheckMultiStoreService();
		const result: boolean = await checkMultiStoreService.execute({ companyId });

		return response.status(200).json(result);
	}

	static async checkIfExistsMultiStoreByCNPJ(request: Request, response: Response): Promise<Response>
	{
		const { cnpj } = request.params;

		const checkMultiStoreByCNPJService = new CheckMultiStoreByCNPJService();
		const result: boolean = await checkMultiStoreByCNPJService.execute(cnpj);

		return response.status(200).json(result);
	}
}

export default CheckMultiStoreController;
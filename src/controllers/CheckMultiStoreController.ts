import { Request, Response } from 'express';
import CheckMultiStoreService from '../services/multiStore/CheckMultiStoreService';

class CheckMultiStoreController
{
	static async checkIfExistsMultiStore(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const checkMultiStoreService = new CheckMultiStoreService();
		const result = await checkMultiStoreService.execute({ company });

		return response.status(200).json(result);
	}
}

export default CheckMultiStoreController;
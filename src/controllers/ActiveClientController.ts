import { Request, Response } from "express";
import ActiveAccountClientService from "../services/customer/ActiveAccountClientService";

class ActiveClientController
{
	static async ative(request: Request, response: Response): Promise<Response>
	{
		const { token, active, id } = request.body;

		const activeAccountClientService = new ActiveAccountClientService();
		const accountActivated = await activeAccountClientService.execute({ token, active, id });

		return response.status(200).json(accountActivated);
	}
}

export default ActiveClientController;
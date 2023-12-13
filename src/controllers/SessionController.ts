import { Request, Response } from "express";
import CreateSessionCustomerService from "../services/session/CreateSessionCustomerService";

class SessionController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const { email, password } = request.body;

		const createSessionCustomerService = new CreateSessionCustomerService();
		const sessionCustomer = await createSessionCustomerService.execute({ email, password });

		return response.status(200).json(sessionCustomer);
	}
}

export default SessionController;
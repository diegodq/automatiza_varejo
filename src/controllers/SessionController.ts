import { Request, Response } from "express";
import CreateSessionCustomerService from "../services/session/CreateSessionCustomerService";
import paramsConfig from '../params/paramsConfig';

class SessionController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const { email, password } = request.body;

		if(paramsConfig.params.useImplicitToken) {
			try {
				const createSessionCustomerService: CreateSessionCustomerService = new CreateSessionCustomerService();
				const sessionCustomer: object = await createSessionCustomerService.execute({ email, password });

				if ('token' in sessionCustomer) {
					if(process.env.APP_MODE == 'development') response.cookie('token', sessionCustomer.token, { httpOnly: true, secure: false });
					else response.cookie('token', sessionCustomer.token, { httpOnly: true, secure: true });

					delete sessionCustomer.token;
				}
				return response.status(200).json(sessionCustomer);
			} catch (error) {
				console.log(error);
				if (error instanceof Error) return response.status(500).json({ error: error.message });
				else return response.status(500).json({ error: 'unknown-error' });
			}
		} else {
			const createSessionCustomerService: CreateSessionCustomerService = new CreateSessionCustomerService();
			const sessionCustomer: string | object = await createSessionCustomerService.execute({ email, password });

			return response.status(200).json(sessionCustomer);
		}
	}
}

export default SessionController;
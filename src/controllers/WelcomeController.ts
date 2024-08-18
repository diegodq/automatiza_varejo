import { Request, Response } from "express";

class WelcomeController
{
	static async welcome(request: Request, response: Response): Promise<Response>
	{
		return response.status(200).json({ message: true });
	}
}

export default WelcomeController;
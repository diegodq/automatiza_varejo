import { Request, Response } from "express";

class WelcomeController
{
	static async welcome(request: Request, response: Response)
	{
		return response.status(200).json({ message: 'Welcome to Automatiza Varejo.' });
	}
}

export default WelcomeController;
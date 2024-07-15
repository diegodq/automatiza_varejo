import { Request, Response } from 'express';
import CreateNewMessageService from '../services/contactUs/CreateNewMessageService';

class ContactUsController
{
	static async sendNewMessage(request: Request, response: Response): Promise<Response>
	{
		const { name, email, phone, message } = request.body;

		const createNewMessageService: CreateNewMessageService = new CreateNewMessageService();
		const apiMessage: string = await createNewMessageService.execute({ name, email, phone, message });

		return response.status(201).json({ status: true, message: apiMessage })
	}
}

export default ContactUsController;
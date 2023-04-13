import { Request, Response } from 'express';
import CreateNewMessageService from '../services/contactUs/CreateNewMessageService';

class ContactUsController
{
	static async sendNewMessage(request: Request, response: Response): Promise<Response>
	{
		const { name, email, subject, message } = request.body;

		const createNewMessageService = new CreateNewMessageService();
		await createNewMessageService.execute({ name, email, subject, message });

		return response.status(201).json({ status: true })
	}
}

export default ContactUsController;
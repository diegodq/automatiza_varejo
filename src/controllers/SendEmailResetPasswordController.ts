import { Request, Response } from "express";

import SendForgotEmailService from "../services/session/SendForgotEmailService";

class SendEmailResetPasswordController
{
	static async send(request: Request, response: Response): Promise<Response>
	{
		const { email } =  request.body;
		const sendForgotEmailService = new SendForgotEmailService();
		const emailSent = await sendForgotEmailService.execute({ email });

		return response.status(200).json({ status: 'success', message: emailSent });
	}
}

export default SendEmailResetPasswordController;
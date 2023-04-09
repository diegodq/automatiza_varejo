import { Request, Response } from "express";
import ResetPasswordService from "../services/session/ResetPasswordService";

class ResetPasswordController
{
	static async reset(request: Request, response: Response)
	{
		const{ token, new_password } = request.body;

		const resetPasswordService = new ResetPasswordService();
		const passwordReset = await resetPasswordService.execute({ token, new_password });

		return response.status(200).json({ status: 'success', message: passwordReset });
	}
}

export default ResetPasswordController;
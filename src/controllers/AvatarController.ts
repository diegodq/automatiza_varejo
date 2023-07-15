import 'dotenv/config';
import { Request, Response } from "express";
import ReturnAvatarCustomerService from "../services/customer/ReturnAvatarCustomerService";
import UpdateCustomerAvatarService from "../services/customer/UpdateCustomerAvatarService";

class AvatarController
{
	static async update(request: Request, response: Response): Promise<Response>
	{
		const size = request.file?.size;
		console.log(size);

		const updateCustomerAvatarService = new UpdateCustomerAvatarService();
		const avatar = await updateCustomerAvatarService.execute({
			id: request.userId,
			avatarFileName: request.file!.filename,
			fileSize: request.file!.size
		});

		if(process.env.APP_MODE == 'development')
			return response.status(200).json({ status: 'success', avatar: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/avatar/' + avatar });
		else
			return response.status(200).json({ status: 'success', avatar: process.env.IMG_URL + '/avatar/' + avatar });
	}

	static async returnAvatar(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;

		const returnAvatarCustomerService = new ReturnAvatarCustomerService();
		const avatar = await returnAvatarCustomerService.execute({ id });

		if(process.env.APP_MODE == 'development')
			return response.status(200).json({ status: 'success', avatar: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/avatar/' + avatar });
		else
			return response.status(200).json({ status: 'success', avatar: process.env.IMG_URL + '/avatar/' + avatar });
	}
}

export default AvatarController;
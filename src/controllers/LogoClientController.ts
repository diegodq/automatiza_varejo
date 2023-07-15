import 'dotenv/config';
import { Request, Response } from "express";
import UpdateLogoClientService from '../services/company/UpdateLogoClientService';
import ReturnLogoClientService from '../services/company/ReturnLogoClientService';

class LogoClientController
{
	static async update(request: Request, response: Response): Promise<Response>
	{
		const updateLogoClientService = new UpdateLogoClientService();
		const logo = await updateLogoClientService.execute({
			id: request.userId,
			logoClientName: request.file!.filename,
			fileSize: request.file!.size
		});

		if(process.env.APP_MODE == 'development')
			return response.status(200).json({ status: 'success', logo: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logo });
		else
			return response.status(200).json({ status: 'success', logo: process.env.IMG_URL + '/logo/' + logo });
	}

	static async returnLogo(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;
		console.log(id);

		const returnLogoClientService = new ReturnLogoClientService();
		const logo = await returnLogoClientService.execute({ id });

		if(process.env.APP_MODE == 'development')
			return response.status(200).json({ status: 'success', logo: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logo });
		else
			return response.status(200).json({ status: 'success', logo: process.env.IMG_URL + '/logo/' + logo });
	}
}

export default LogoClientController;
import 'dotenv/config';
import { Request, Response } from "express";
import UpdateLogoClientService from '../services/company/UpdateLogoClientService';
import ReturnLogoClientService from '../services/company/ReturnLogoClientService';
import convertUserIdInCompanyId from '../utils/convertUserIdInCompanyId';

class LogoClientController
{
	static async update(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;
		const id: number = await convertUserIdInCompanyId(Number(company));

		const updateLogoClientService: UpdateLogoClientService = new UpdateLogoClientService();
		const logo: string = await updateLogoClientService.execute({
			id: String(id),
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

		const returnLogoClientService: ReturnLogoClientService = new ReturnLogoClientService();
		const logo : string = await returnLogoClientService.execute({ id });

		if(process.env.APP_MODE == 'development')
			return response.status(200).json({ status: 'success', logo: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + logo });
		else
			return response.status(200).json({ status: 'success', logo: process.env.IMG_URL + '/logo/' + logo });
	}
}

export default LogoClientController;
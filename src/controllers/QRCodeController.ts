import { Request, Response } from "express";
import path from "path";
import qrcode from 'qrcode';

class QRCodeController
{
	static async generate(request: Request, response: Response)
	{
		const {cnpj} = request.body;

		const url = `https://pesquisa.automatizavarejo.com.br/open?cnpj=${cnpj}`;
		const output = path.join(__dirname, '../avatars/' + `${cnpj}.png`);
		await qrcode.toFile(output, url);

		if(process.env.APP_MODE == 'development')
			return response.status(200).json({ status: 'success', address: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/files/' + `${cnpj}.png` });
		else
			return response.status(200).json({ status: 'success', address: process.env.IMG_UR + '/files/' + `${cnpj}.png` });
	}
}

export default QRCodeController;
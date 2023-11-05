import { Request, Response } from "express";
import path from "path";
import qrcode from 'qrcode';

class QRCodeController
{
	static async generate(request: Request, response: Response)
	{
		const company = request.userId;
		const { cnpj, store_number } = request.body;

		const url = `https://pesquisa.automatizavarejo.com.br/?cnpj=${cnpj}`;
		const output = path.join(__dirname, '../qrcode/' + `${cnpj}.png`);
		await qrcode.toFile(output, url, {
			margin: 1,
			scale: 12
		});

		if(process.env.APP_MODE == 'development')
			return response.status(200).json({ status: 'success', address: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/qrcode/' + `${cnpj}.png` });
		else
			return response.status(200).json({ status: 'success', address: process.env.IMG_URL + '/qrcode/' + `${cnpj}.png` });
	}
}

export default QRCodeController;
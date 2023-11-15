import { Request, Response } from "express";
import GetQRCodeService from "../services/qrcodeService/GetQRCodeService";

class QRCodeController
{
	public static async getQRCodeByStore(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const { id_store } = request.params;

		const getQrCodeService = new GetQRCodeService();
		const getQrCode: object = await getQrCodeService.execute({ company, id_store });

		return response.status(200).json(getQrCode );
	}
}

export default QRCodeController;
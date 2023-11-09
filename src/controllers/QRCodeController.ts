import { Request, Response } from "express";
import appDataSource from "../data-source";
import Company from "src/entities/Company";
import companyRepository from "src/repositories/companyRepository";
import { BadRequestError } from "src/utils/ApiErrors";
import storeRepository from 'src/repositories/storeRepository';
import Store from "src/entities/Store";

class QRCodeController
{
	static async getQRCodeByStore(request: Request, response: Response)
	{
		const company = request.userId;

		const { id_store } = request.params;

		const idStore = Number(id_store);

		const companyExists: Company | null = await companyRepository.findOneBy({ id: Number(company) });
		if(!companyExists)
			throw new BadRequestError('company-do-not-exists');

		const storeExists: Store | null = await storeRepository.findOneBy({ id: Number(idStore) });
		if(!storeExists)
			throw new BadRequestError('store-do-not-exists');

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQueryRunner =  await queryRunner.query(`select qrcode_name from qrcode_control where
		qrcode_control.company_id = ? and qrcode_control.id_store = ?;`, [company, idStore]);

		await queryRunner.release();

		let qrCodeName = '';
		resultQueryRunner.forEach((qrcode: { qrcode_name: string; }) => {
			qrCodeName = qrcode.qrcode_name;
		});

		if(process.env.APP_MODE == 'development')
			return response.status(200).json({ status: 'success', address: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/qrcode/' + `${qrCodeName}.png` });
		else
			return response.status(200).json({ status: 'success', address: process.env.IMG_URL + '/qrcode/' + `${qrCodeName}.png` });
	}
}

export default QRCodeController;
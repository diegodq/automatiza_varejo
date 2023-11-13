import { Request, Response } from "express";
import appDataSource from "../data-source";
import Company from "../entities/Company";
import companyRepository from "../repositories/companyRepository";
import { BadRequestError } from "../utils/ApiErrors";
import storeRepository from '../repositories/storeRepository';
import Store from "../entities/Store";
import fs from 'fs';
import path from "path";

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
			throw new BadRequestError('file-not-found');

		if(!storeExists.active)
			throw new BadRequestError('store-disable');

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQueryRunner =  await queryRunner.query(`select qrcode_name from qrcode_control where
		qrcode_control.company_id = ? and qrcode_control.id_store = ?;`, [company, idStore]);

		await queryRunner.release();

		let qrCodeName = '';
		resultQueryRunner.forEach((qrcode: { qrcode_name: string; }) => {
			qrCodeName = qrcode.qrcode_name;
		});

		console.log(qrCodeName);

		const qrCodePath: string = path.join(__dirname, '../qrcode/');
		const qrCodeNames: string[] = fs.readdirSync(qrCodePath);
		if(qrCodeNames.length === 0)
			throw new BadRequestError('directory-empty');

		if(process.env.APP_MODE == 'development')
			return response.status(200).json({ status: 'success', address: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/qrcode/' + `${qrCodeName}.png` });
		else
			return response.status(200).json({ status: 'success', address: process.env.IMG_URL + '/qrcode/' + `${qrCodeName}.png` });
	}
}

export default QRCodeController;
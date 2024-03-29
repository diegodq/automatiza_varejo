import path from "path";
import appDataSource from "../../data-source";
import Store from "../../entities/Store";
import storeRepository from "../../repositories/storeRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import paramsConfig from "../../params/paramsConfig";
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";
import fs from 'fs';
import Customer from "../../entities/Customer";
import customerRepository from "../../repositories/customerRepository";

type QRCodeType =
{
	company_id: number,
	id_store: string
}

class GetQRCodeService
{
	public async execute({ company_id, id_store }: QRCodeType): Promise<object>
	{
		const companyId: number = await convertUserIdInCompanyId(company_id);

		const companyExists: Customer | null = await customerRepository.findOneBy({ id: companyId });
		if(!companyExists)
			throw new BadRequestError('company-do-not-exists');

		// const company: Company = companyExists;

		if(paramsConfig.params.validateGetQRCodeParams) {
			if(await this.checkMultiStoreIsOn(companyId) == 1) {
				if(await this.checkMultiStoreIsOn(companyId) == 1 && id_store == undefined) {
					throw new BadRequestError('multi-store-enable-send-id-store');
				}

				if(await this.checkMultiStoreIsOn(companyId) == 0 && id_store != undefined) {
					throw new BadRequestError('multi-store-disabled-for-this-store');
				}

				const storeExists: Store | null = await storeRepository.findOneBy({ id: companyId });
				if(!storeExists)
					throw new BadRequestError('store-not-found');

				if(!storeExists.active)
					throw new BadRequestError('store-disable');
			}
		}

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		let resultQueryRunner = null;
		if(await this.checkMultiStoreIsOn(company_id)) {
			resultQueryRunner = await queryRunner.query(`select qrcode_name from qrcode_control where
			qrcode_control.company_id = ? and qrcode_control.id_store = ?;`, [companyId, id_store]);
		} else {
			resultQueryRunner = await queryRunner.query(`select substring(qrcode_name, 1, 14) as qrcode_name
			from qrcode_control where id_store = 0 and company_id = ?;`, [ companyId ]);
		}

		await queryRunner.release();

		if(await this.checkMultiStoreIsOn(company_id) == 0 && resultQueryRunner.length == 0) {
			throw new BadRequestError('unregistered-qrcode-for-head-office');
		}

		let qrCodeName = '';
		resultQueryRunner.forEach((qrcode: { qrcode_name: string; }) => {
			qrCodeName = qrcode.qrcode_name;
		});

		const qrCodePath: string = path.join(__dirname, '../../qrcode/');
		const qrCodeNames: string[] = fs.readdirSync(qrCodePath);
		if(qrCodeNames.length === 0)
			throw new BadRequestError('empty-directory');

		if(process.env.APP_MODE == 'development')
			return { status: 'success', address: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/qrcode/' + `${qrCodeName}.png` };
		else
			return { status: 'success', address: process.env.IMG_URL + '/qrcode/' + `${qrCodeName}.png` };
	}

	private async checkMultiStoreIsOn(companyId: number): Promise<number>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const multiStoreIsOn = await queryRunner.query(`select multi_store from company_product join company
		on company.id = company_product.company where company.id = ?;`, [companyId]);

		await queryRunner.release();

		let hasMultiStore = 0;
		multiStoreIsOn.forEach((item: {multi_store: number}) => {
			hasMultiStore = item.multi_store;
		})

		return hasMultiStore;
	}
}

export default GetQRCodeService;
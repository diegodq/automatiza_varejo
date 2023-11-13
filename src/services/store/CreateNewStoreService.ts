import storeRepository from "../../repositories/storeRepository";
import Store from "../../entities/Store";
import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import CreateQrCodeService from "../qrcodeService/CreateQrCodeService";
import unformatCNPJ from "../../utils/unformatCNPJ";
import CreateQRCodeControlService from "../qrcodeService/CreateQRCodeControlService";
import appDataSource from "src/data-source";
import Company from "../../entities/Company";

type TypeStore =
{
	name: string,
	address: string,
	company: Company
	store_number: number
}

class CreateNewStoreService
{
	public async execute({ name, address, company, store_number }:TypeStore): Promise<string>
	{
		const companyExists: Company | null = await companyRepository.findOneBy({ id: Number(company) });
		if(!companyExists)
			throw new BadRequestError('no-company');

		const storeExists: Store | null = await storeRepository.findOneBy({ name });
		if(storeExists)
			throw new BadRequestError('store-already-registered');

		const storeAddressExists: Store | null = await storeRepository.findOneBy({ address });
		if(storeAddressExists)
			throw new BadRequestError('address-already-registered');

		if(await this.checkMultiStoreIsOn(company))
		{
			const storeNumberExists: Store | null = await storeRepository.findOneBy({ store_number });
			if(storeNumberExists)
				throw new BadRequestError('store-number-already-registered');
		}

		if(await this.checkMultiStoreIsOn(company)) {
			const store: Store = storeRepository.create({ name, address, company, store_number });
			const idStoreSaved: Store = await storeRepository.save(store);

			const formattedCNPJ: string = companyExists.cnpj;
			const id_store: number = idStoreSaved.id;
			const cnpj: string = unformatCNPJ(formattedCNPJ);

			const qrcode_name: string = cnpj + '.' + id_store.toString();

			const createQrCodeService = new CreateQrCodeService();
			await createQrCodeService.execute({ cnpj, id_store });

			const createQRCodeControlService = new CreateQRCodeControlService();
			await createQRCodeControlService.execute({qrcode_name, company, id_store });

			return 'new-store-added';
		} else {
			const store: Store = storeRepository.create({ name, address, company, store_number });
			await storeRepository.save(store);

			const formattedCNPJ: string = companyExists.cnpj;
			const cnpj: string = unformatCNPJ(formattedCNPJ);

			const id_store = 0;
			const qrcode_name: string = cnpj + '.' + id_store;

			const createQrCodeService = new CreateQrCodeService();
			await createQrCodeService.execute({ cnpj, id_store });

			const createQRCodeControlService = new CreateQRCodeControlService();
			await createQRCodeControlService.execute({qrcode_name, company, id_store });

			return 'new-store-added';
		}
	}

	private async checkMultiStoreIsOn(company: Company): Promise<number>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const multiStoreIsOn = await queryRunner.query(`select multi_store from company_product join company
		on company.id = company_product.company where company.id = ?;`, [company]);

		await queryRunner.release();

		let hasMultiStore = 0;
		multiStoreIsOn.forEach((item: {multi_store: number}) => {
			hasMultiStore = item.multi_store;
		})

		return hasMultiStore;
	}
}

export default CreateNewStoreService;
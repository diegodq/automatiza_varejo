import storeRepository from "../../repositories/storeRepository";
import Store from "../../entities/Store";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from "../../entities/Company";
import companyRepository from "../../repositories/companyRepository";
import CreateQrCodeService from "../qrcodeService/CreateQrCodeService";
import unformatCNPJ from "../../utils/unformatCNPJ";
import CreateQRCodeControlService from "../qrcodeService/CreateQRCodeControlService";

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

		const storeNumberExists: Store | null = await storeRepository.findOneBy({ store_number });
		if(storeNumberExists)
			throw new BadRequestError('store-number-already-registered');

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
	}
}

export default CreateNewStoreService;
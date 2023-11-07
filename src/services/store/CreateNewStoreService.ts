import storeRepository from "../../repositories/storeRepository";
import Store from "../../entities/Store";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from "../../entities/Company";
import companyRepository from "../../repositories/companyRepository";

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
		await storeRepository.save(store);

		return 'new-store-added';
	}
}

export default CreateNewStoreService;
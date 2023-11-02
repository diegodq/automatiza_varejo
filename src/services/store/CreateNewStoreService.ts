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
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const store: Store = storeRepository.create({ name, address, company, store_number });
		await storeRepository.save(store);

		return 'new-store-added';
	}
}

export default CreateNewStoreService;
import storeRepository from "../../repositories/storeRepository";
import Store from "../../entities/Store";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from "../../entities/Company";
import companyRepository from "../../repositories/companyRepository";

type TypeStore =
{
	id: number,
	name: string,
	address: string,
	company: Company
}

class EditStoreService
{
	public async execute({ id, name, address,company }:TypeStore): Promise<string>
	{
		const companyExists: Company | null = await companyRepository.findOneBy({id: Number(company)});
		if(!companyExists) {
			throw new BadRequestError('company-do-not-exists');
		}

		const storeExists: Store | null = await storeRepository.findOneBy({ id: Number(id) });
		if(!storeExists) {
			throw new BadRequestError('store-do-not-exists');
		}

		storeExists.name = name;
		storeExists.address = address;

		await storeRepository.save(storeExists);

		return 'store-updated';
	}
}

export default EditStoreService;
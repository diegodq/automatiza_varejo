import storeRepository from "../../repositories/storeRepository";
import Store from "../../entities/Store";
import { BadRequestError } from "../../utils/ApiErrors";

type TypeStore =
{
	id: number,
	name: string,
	address: string
}

class EditStoreService
{
	public async execute({ id, name, address }:TypeStore): Promise<string>
	{
		const storeExists: Store | null = await storeRepository.findOneBy({ id });
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
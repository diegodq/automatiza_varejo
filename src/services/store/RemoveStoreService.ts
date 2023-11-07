import { BadRequestError } from "../../utils/ApiErrors";
import Store from "../../entities/Store";
import storeRepository from "../../repositories/storeRepository";

class RemoveStoreService
{
	public async execute(id_store: number): Promise<string>
	{
		const storeExists: Store | null = await storeRepository.findOneBy({ id: Number(id_store) });
		if(!storeExists)
			throw new BadRequestError('store-do-not-exists');

		await storeRepository.remove(storeExists);

		return 'store-removed';
	}
}

export default RemoveStoreService;
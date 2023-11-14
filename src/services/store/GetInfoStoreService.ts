import appDataSource from "../../data-source";
import storeRepository from "../../repositories/storeRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Store from "../../entities/Store";

type StoreType = {
	id_store: string
}

class GetInfoStoreService
{
	public async execute({ id_store }: StoreType): Promise<object>
	{
		const storeExists: Store | null = await storeRepository.findOneBy({ id: Number(id_store) });
		if(!storeExists)
			throw new BadRequestError('store-do-not-exists');

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult: object = await queryRunner.query(`select store.* from store
		where store.id = ?;`, [ id_store ]);

		await queryRunner.release();

		return queryResult;
	}
}

export default GetInfoStoreService;
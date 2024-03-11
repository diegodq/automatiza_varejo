import appDataSource from "../../data-source";
import storeRepository from "../../repositories/storeRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Store from "../../entities/Store";
import { QueryRunner } from 'typeorm';

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

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select store.* from store
		where store.id = ?;`, [ id_store ]);

		await queryRunner.release();

		if(queryResult.length === 0)
			throw new BadRequestError('no-store');

		queryResult.forEach((item: { store_number: string | number; }) => {
			if(item.store_number == 0) item.store_number = '';
		});

		return queryResult;
	}
}

export default GetInfoStoreService;
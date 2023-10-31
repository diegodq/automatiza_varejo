import storeRepository from "../../repositories/storeRepository";
import Store from "../../entities/Store";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from "../../entities/Company";
import appDataSource from "../../data-source";

type TypeStore =
{
	name: string,
	address: string,
	company: Company
}

class EditStoreService
{
	public async execute({ name, address, company }:TypeStore): Promise<string>
	{
		const storeExists: Store | null = await storeRepository.findOneBy({ name });
		if(storeExists) {
			throw new BadRequestError('store-already-registered');
		}

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`update store set name = ?, address = ? where company_id = ?;`, [name, address, company]);

		await queryRunner.release();

		return 'store-updated';
	}
}

export default EditStoreService;
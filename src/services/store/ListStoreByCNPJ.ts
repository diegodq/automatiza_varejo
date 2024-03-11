import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";
import formatCNPJ from "../../utils/formatCNPJ";
import { QueryRunner } from 'typeorm';


class ListStoreByCNPJ
{
	public async execute(cnpj: string): Promise<object>
	{
		const cnpjCompany: string = formatCNPJ(cnpj);

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select store.id, store.name, store.address, store.store_number, store.active from store
		join company on company.id = store.company_id where company.cnpj = ?;`, [cnpjCompany]);

		await queryRunner.release();

		if(resultQuery.length === 0)
			throw new BadRequestError('no-store');

		return resultQuery;
	}
}

export default ListStoreByCNPJ;
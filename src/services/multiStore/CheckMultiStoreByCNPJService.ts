import formatCNPJ from "../../utils/formatCNPJ";
import appDataSource from "../../data-source";

class CheckMultiStoreByCNPJService
{
	public async execute(cnpj: any): Promise<boolean>
	{
		const cnpjCompany: string = formatCNPJ(cnpj);
		console.log(cnpjCompany);

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const queryResult = await queryRunner.query(`select multi_store from company_product
		join company on company_product.company = company.id where company.cnpj = ?;`, [ cnpjCompany ]);

		await queryRunner.release();

		let result = 0;
		queryResult.forEach((item: { multi_store: any; }) => {
			result = item.multi_store;
		});

		if(result)
			return true;
		else
			return false;
	}
}
export default CheckMultiStoreByCNPJService;
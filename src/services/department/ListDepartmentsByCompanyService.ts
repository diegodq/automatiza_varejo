import appDataSource from "../../data-source";

type CompanyRequest =
{
	id: number;
}

class ListDepartmentsByCompanyService
{
	public async execute({ id }: CompanyRequest): Promise<object>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const listDepartments = await queryRunner.manager.query(`select d.id, d.name, d.status from department as d join company as c on d.company_id = c.id = ${id}`);

		await queryRunner.release();

		return listDepartments;
	}
}

export default ListDepartmentsByCompanyService;
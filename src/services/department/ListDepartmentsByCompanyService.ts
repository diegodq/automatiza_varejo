import Company from "../../entities/Company";
import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";

type CompanyRequest =
{
	id: string;
}

class ListDepartmentsByCompanyService
{
	public async execute({ id }: CompanyRequest): Promise<Company[] | null>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const listDepartments = await queryRunner.manager.query(`select d.id, d.name, d.status from department as d join company as c on d.company_id = c.id = ${id}`);

		await queryRunner.release();

		if(listDepartments.length == 0) {
			throw new BadRequestError('no-departments');
		}

		return listDepartments;

	}
}

export default ListDepartmentsByCompanyService;
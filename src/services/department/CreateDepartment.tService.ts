import departmentRepository from "../../repositories/departmentRepository";
import Company from "../../entities/Company";
import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import Department from '../../entities/Department';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";
import appDataSource from "../../data-source";


type DepartmentRequest =
{
	name: string;
	status: number;
	company: number;
}

class CreateDepartmentService
{
	public async execute({ name, status, company }: DepartmentRequest): Promise<string | any>
	{
		const company_id: number = await convertUserIdInCompanyId(Number(company));

		const companyExists: Company | null = await companyRepository.findOneBy({ id: company_id });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const departmentExists: Department | null = await departmentRepository.findOne({ where: { company: { id: company_id } } });
		if(departmentExists?.name == name) {
			throw new BadRequestError('department-already-registered');
		}

		const queryRunner = appDataSource.createQueryRunner();
  	await queryRunner.connect();

  	await queryRunner.query(`insert into department
		(name, status, company_id)
		values (?, ?, ?);`, [name, status, company_id]);

  	await queryRunner.release();

		return 'department-added';
	}
}

export default CreateDepartmentService;
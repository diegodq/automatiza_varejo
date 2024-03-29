import companyRepository from "../../repositories/companyRepository";
import appDataSource from "../../data-source";
import { QueryResult, QueryRunner } from 'typeorm';
import Company from "../../entities/Company";
import { BadRequestError } from "../../utils/ApiErrors";
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type CompanyTypes =
{
  company: number;
}

class ListParamsProductService
{
  public async execute({ company }: CompanyTypes): Promise<object>
  {
    const id = await convertUserIdInCompanyId(Number(company));

		const companyId = id;

    const companyExists: Company | null = await companyRepository.findOneBy({ id });
    if(!companyExists)
      throw new BadRequestError('company-not-found');

    const queryRunner: QueryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();

    const resultQuery: QueryResult = await queryRunner.query(`select params_product.background_color, params_product.font_color, params_product.passing_tree, params_product.lock_by_ip, params_product.company_id
    from params_product join company where params_product.company_id = ? LIMIT 1;`, [companyId]);

    await queryRunner.release();

    return resultQuery;
  }
}

export default ListParamsProductService;
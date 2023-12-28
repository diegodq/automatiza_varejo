import Company from "../../entities/Company";
import appDataSource from "../../data-source";
import Customer from "../../entities/Customer";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import { QueryRunner } from 'typeorm';

interface RequestCompany
{
	corporate_name: string,
	fantasy_name: string,
	cnpj: string,
	zip_code: string,
	state: string,
	address: string,
	complement: string,
	number: string,
	district:string,
	city: string
	type_company?: string;
}

class CreateCompanyService
{
	public async execute( {corporate_name, fantasy_name, cnpj, zip_code,
		state, address, number, complement,
		district, city, type_company }: RequestCompany ): Promise<object>
	{
		const companyCNPJ: Company | null = await companyRepository.findOneBy({ cnpj });
		if(companyCNPJ) {
			throw new BadRequestError('company-already-registered');
		}

		if(type_company == undefined)
			type_company = 'MATRIZ';

		if(type_company !== 'MATRIZ' && type_company !== 'FILIAL')
			throw new BadRequestError('company-must-be-matriz-or-filial');

		const newCompany: Company = companyRepository.create({ corporate_name, fantasy_name, cnpj, zip_code, state,
			complement, address, number, district, city, type_company });

		const saveNewCompany: Company = await companyRepository.save(newCompany);

		await this.addCompanyInParamsProduct(saveNewCompany.getId);

		return { message: 'success', companyId: newCompany.getId };
	}

	private async addCompanyInParamsProduct(id: number)
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into params_product (company_id) values (${id})`);

		await queryRunner.release();
	}
}

export default CreateCompanyService;
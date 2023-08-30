import appDataSource from "src/data-source";
import Customer from "../../entities/Customer";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";

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
	city: string,
	customer: Customer
}

class CreateCompanyService
{
	public async execute( {corporate_name, fantasy_name, cnpj, zip_code,
		state, address, number, complement,
		district, city, customer }: RequestCompany ): Promise<object>
	{
		const companyCNPJ = await companyRepository.findOneBy({ cnpj });
		if(companyCNPJ) {
			throw new BadRequestError('Empresa já está cadastrada.');
		}

		const newCompany = companyRepository.create({ corporate_name, fantasy_name, cnpj, zip_code, state,
			complement, address, number, district, city, customer });

		const saveNewCompany = await companyRepository.save(newCompany);

		this.addCompanyInParamsProduct(saveNewCompany.getId);

		return { message: 'success', companyId: newCompany.getId };
	}

	private async addCompanyInParamsProduct(id: number)
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into params_product (company_id) values (${id})`);

		await queryRunner.release();
	}
}

export default CreateCompanyService;
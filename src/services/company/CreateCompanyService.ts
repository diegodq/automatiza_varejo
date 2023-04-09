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
		district, city, customer}: RequestCompany )
	{
		const companyCNPJ = await companyRepository.findOneBy({ cnpj });
		if(companyCNPJ) {
			throw new BadRequestError('Empresa já está cadastrada.');
		}

		const newCompany = companyRepository.create({ corporate_name, fantasy_name, cnpj, zip_code, state, complement,address, number,
			district, city, customer });

		await companyRepository.save(newCompany);

		return 'Nova empresa adicionada.';
	}
}

export default CreateCompanyService;
import { BadRequestError } from "../../utils/ApiErrors";
import paramsConfig from "../../params/paramsConfig";
import companyRepository from "../../repositories/companyRepository";
import Company from '../../entities/Company';

type RequestCompany =
{
	id: string;
	corporate_name: string;
	fantasy_name: string;
	cnpj: string;
	zip_code: string;
	state: string;
	city: string;
	district: string;
	address: string;
	complement: string;
	number: string;
}

class UpdateCompanyService
{
	public async execute({ id, corporate_name, fantasy_name, cnpj,
		zip_code, state, city, district, address,
		complement ,number }: RequestCompany): Promise<string>
	{
		const company: Company | null = await companyRepository.findOneBy({ id: Number(id) });
		if(!company) {
			throw new BadRequestError('Empresa não cadastrada');
		}

		const companyCNPJ: Company | null  = await companyRepository.findOne({ where: { cnpj }});
		if(companyCNPJ?.cnpj !== cnpj || !paramsConfig.params.allowChangeCNPJ) {
			throw new BadRequestError('Alteração de CNPJ não permitido');
		}

		if(paramsConfig.params.allowChangeCNPJ) {
			company.corporate_name = corporate_name;
			company.fantasy_name = fantasy_name;
			company.cnpj = cnpj;
			company.zip_code = zip_code;
			company.state = state;
			company.city = city;
			company.district = district;
			company.address = address;
			company.complement = complement;
			company.number = number;

			await companyRepository.save(company);
		}

		if(!paramsConfig.params.allowChangeCNPJ) {
			company.corporate_name = corporate_name;
			company.fantasy_name = fantasy_name;
			company.cnpj = cnpj;
			company.zip_code = zip_code;
			company.state = state;
			company.city = city;
			company.district = district;
			company.address = address;
			company.complement = complement;
			company.number = number;

			await companyRepository.save(company);
		}

		return 'Empresa atualizada.';
	}
}

export default UpdateCompanyService;
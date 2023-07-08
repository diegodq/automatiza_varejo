import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import productRepository from "../../repositories/productRepository";
import formatCNPJ from "../../utils/formatCNPJ";

type NPSRequest = {
	cnpj_company: string
}

class ListProductByCompanyService
{
	public async execute({ cnpj_company }: NPSRequest)
	{
		const cnpj = formatCNPJ(cnpj_company);
		if(cnpj.length < 14 && cnpj.length > 15) {
			throw new BadRequestError('invalid-cnpj');
		}

		const companyExists = await companyRepository.findOneBy({ cnpj });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const id = companyExists.getId;

		const paramsProduct = await productRepository.find({
			relations: {
				params_product: true
			},

			where: {
				company: { id }
			}
		});

		return { status: 'success', paramsProduct: paramsProduct}
	}
}

export default ListProductByCompanyService;
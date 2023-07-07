import { BadRequestError } from "../../utils/ApiErrors";
import companyRepository from "../../repositories/companyRepository";
import productRepository from "../../repositories/productRepository";

type NpsRequest =
{
	cnpj: string;
}

class ListProductByCompanyService
{
	public async execute({ cnpj }: NpsRequest)
	{
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
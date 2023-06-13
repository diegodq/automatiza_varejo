import companyRepository from "../../repositories/companyRepository";
import productRepository from "../../repositories/productRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type ProductRequest =
{
	company: string;
}

class ListProductByCompanyService
{
	public async execute({ company }: ProductRequest): Promise<object | null>
	{
		const id = Number(company);

		const companyExists = await companyRepository.findOneBy({ id: Number(id) });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const products = await productRepository.find({
			where: { company: { id } }
		});

		return products;
	}
}

export default ListProductByCompanyService;
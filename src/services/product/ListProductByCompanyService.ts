import companyRepository from "../../repositories/companyRepository";
import productRepository from "../../repositories/productRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from '../../entities/Company';
import Product from '../../entities/Product';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type ProductRequest =
{
	company: string;
}

class ListProductByCompanyService
{
	public async execute({ company }: ProductRequest): Promise<object | null>
	{
		const id = await convertUserIdInCompanyId(Number(company));

		const companyExists: Company | null = await companyRepository.findOneBy({ id: Number(id) });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const products: Product[] = await productRepository.find({
			where: { company: { id } }
		});

		return products;
	}
}

export default ListProductByCompanyService;
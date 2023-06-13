import productRepository from "../../repositories/productRepository";
import Company from "../../entities/Company";
import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";

interface RequestProduct
{
	name: string;
	description: string;
	company: Company;
}

class CreateProductService
{
	public async execute({ name, description, company }: RequestProduct): Promise<string>
	{
		const companyExists = await companyRepository.findOneBy({ id: Number(company) });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const newProduct = productRepository.create({ name, description, company });
		await productRepository.save(newProduct);

		return 'new-product-added';
	}
}

export default CreateProductService;
import productRepository from "../../repositories/productRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Customer from "../../entities/Customer"

type RequestProduct =
{
	id: Customer;
}

class RemoveProductService
{
	public async execute( { id }: RequestProduct ): Promise<string>
	{
		const product = await productRepository.findOneBy({ id: Number(id) });
		if(!product) {
			throw new BadRequestError('Produto não cadastrado.');
		}

		if(product.customer == id) {
			throw new BadRequestError('Existe(m) cliente(s) usando teste produto. Não é possível removê-lo');
		}
		return 'Produto removido.'
	}
}

export default RemoveProductService;
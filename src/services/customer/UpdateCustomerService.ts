import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Customer from '../../entities/Customer';

type dataJson = {
	[key: string]: string | number;
}

type TypeRequest =
{
	tokenId: string;
	dataJson: dataJson;
}

class UpdateCustomerService
{
	public async execute({ tokenId, dataJson }: TypeRequest): Promise<string>
	{
		let keyFound = false;
		for (const key in dataJson)
		{
			if(key === 'id') {
				keyFound = true;
				break;
			}
		}

		if (!keyFound) {
			const customer: Customer | null = await customerRepository.findOneBy({ id: Number(tokenId) });
			if(!customer) {
				throw new BadRequestError('customer-not-found.');
			}

			await customerRepository.update(customer.id, dataJson);
		}

		let idClient = 0
		for (const idCustomer in dataJson)
		{
			if (idCustomer === 'id') {
				const id: number = dataJson[idCustomer] as number;
				idClient = id;
			}
		}

		const customer: Customer | null = await customerRepository.findOneBy({ id: Number(idClient) });
		if(!customer) {
			throw new BadRequestError('customer-not-found.');
		}

		const newDataJson: object = await this.returnNewObject(dataJson, String(idClient));

		await customerRepository.update(customer.id, newDataJson);
		return 'customer-updated';
	}

	private async returnNewObject(dataJson: dataJson, keyToRemove: string): Promise<object>
	{
		const newObject = { ...dataJson };
		if (keyToRemove in newObject) {
			delete newObject[keyToRemove];
		}

		return newObject;
	}
}

export default UpdateCustomerService;
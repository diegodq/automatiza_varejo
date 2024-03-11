import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Customer from '../../entities/Customer';
import appDataSource from "../../data-source";

type RoleCustomerRequest = {
	role_id?: number,
	customer_id: number
}

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

			const customer_id = customer.id;
			let role_id = 0;
			for(const key in dataJson) {
				if (key === 'role_id') {
					role_id = dataJson.role_id as number;
					break;
				}
			}

			if (role_id !== 0)
				await this.updateRoleCustomer({ role_id, customer_id });

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

		let role_id = 0;
		for(const key in dataJson) {
			if (key === 'role_id') {
				role_id = dataJson.role_id as number;
				break;
			}
		}

		if (role_id !== 0)
			await this.updateRoleCustomer({ role_id, customer_id: customer.id });

		await customerRepository.update(customer.id, newDataJson);

		return 'customer-updated';
	}

	public async updateRoleCustomer({ role_id, customer_id }: RoleCustomerRequest): Promise<void>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`update roles_customer set role_id = ? where customer_id = ?;`, [role_id, customer_id]);

		await queryRunner.release();
	}

	private async returnNewObject(dataJson: dataJson, keyToRemove: string): Promise<object>
	{
		const newObject = { ...dataJson };
		if('role_id' in newObject)
			delete newObject.role_id;

		if (keyToRemove in newObject) {
			delete newObject[keyToRemove];
		}

		return newObject;
	}
}

export default UpdateCustomerService;
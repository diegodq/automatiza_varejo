import { Request, Response } from 'express';
import CreateTypeCustomerService from '../services/typeCustomer/CreateTypeCustomerService';
import RemoveTypeCustomerService from '../services/typeCustomer/RemoveTypeCustomerService';
import GetTypeCustomersService from '../services/typeCustomer/GetTypeCustomersService';
import UpdateTypeCustomerService from '../services/typeCustomer/UpdateTypeCustomerService';

class TypeCustomerController
{
	static async list(request: Request, response: Response): Promise<Response>
	{
		const listTypeCustomers: GetTypeCustomersService = new GetTypeCustomersService();
		const typeCustomers: object = await listTypeCustomers.execute();

		return response.status(200).json(typeCustomers);
	}

	static async create(request: Request, response: Response): Promise<Response>
	{
		const { type_customer } = request.body;

		const typeCustomer: CreateTypeCustomerService = new CreateTypeCustomerService();
		const newtypeCustomer: string = await typeCustomer.execute({ type_customer });

		return response.status(201).json(newtypeCustomer);
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const {id} = request.params;

		const removeTypeCustomer: RemoveTypeCustomerService = new RemoveTypeCustomerService();
		const typeQuestionRemoved: string = await removeTypeCustomer.execute({id});

		return response.status(200).json(typeQuestionRemoved);
	}

	static async update(request: Request, response: Response): Promise<Response>
	{
		const { id, type_customer } = request.body;

		const updateTypeCustomer: UpdateTypeCustomerService = new UpdateTypeCustomerService();
		const typeCustomerUpdated: string = await updateTypeCustomer.execute({ id, type_customer });

		return response.status(200).json(typeCustomerUpdated);
	}
}

export default TypeCustomerController;
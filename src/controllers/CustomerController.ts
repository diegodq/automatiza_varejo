import { Request, Response } from 'express';
import UpdateEmailCustomer from '../services/customer/UpdateEmailCustomer';
import UpdatePasswordCustomer from '../services/customer/UpdatePasswordCustomer';
import CreateCustomerService from '../services/customer/CreateCustomerService';
import ListCustomerService from '../services/customer/ListCustomerService';
import RemoveCustomerService from '../services/customer/RemoveCustomerService';
import ShowCustomerService from '../services/customer/ShowCustomerService';
import UpdateCustomerService from '../services/customer/UpdateCustomerService';
import ShowDetailCustomerService from '../services/customer/ShowDetailCustomerService';
import RemoveAvatarCustomerService from '../services/customer/RemoveAvatarCustomerService';
import ResetPasswordService from '../services/session/ResetPasswordService';
import CheckHasCompanyService from '../services/customer/CheckHasCompanyService';
import PaymentNewsletterService from '../services/customer/PaymentNewsletterService';

class CustomerController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const { first_name, surname, position, phone, email, password, accept_terms } = request.body;

		const createCustomerService = new CreateCustomerService();
		const newCustomer = await createCustomerService.execute({ first_name, surname, position, phone, email, password, accept_terms });

		return response.status(201).json({ status: 'success', message: newCustomer });
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const listCustomerService = new ListCustomerService();
		const listCustomers = await listCustomerService.execute();

		return response.status(200).json(listCustomers);
	}

	static async show(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;

		const showCustomerService = new ShowCustomerService();
		const showCustomer = await showCustomerService.execute({ id });

		return response.status(200).json(showCustomer);
	}

	static async update(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;

		const { first_name, surname, position, phone } = request.body;

		const updateCustomerService = new UpdateCustomerService();
		const updateCustomer = await updateCustomerService.execute({ id, first_name, surname, position, phone });

		return response.status(201).json({ status: 'success', message: updateCustomer });
	}

	static async remove(request: Request, response: Response)
	{
		const id = request.userId;
		const { email, password } = request.body;

		const removeCustomerService = new RemoveCustomerService();
		const customerRemoved = await removeCustomerService.execute({ id, email, password });

		return response.status(200).json({ status: 'success', message: customerRemoved });
	}

	static async showDetailsCustomer(request: Request, response: Response)
	{
		const id = request.userId;

		const showDetailsCustomerService = new ShowDetailCustomerService();
		const details = await showDetailsCustomerService.execute({ id });

		return response.status(200).json(details);
	}

	static async updateEmailCustomer(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;

		const password = request.body.password
		const email = request.body.new_email;

		const updateEmailCustomer = new UpdateEmailCustomer();
		const updateEmail = await updateEmailCustomer.execute({ id, password, email });

		return response.status(200).json({ status: 'success', message: updateEmail });
	}

	static async updatePasswordCustomer(request: Request, response: Response): Promise<Response>
	{
		const { old_password, new_password, city, region_name, country } = request.body;

		const id = request.userId;
		const password = new_password;

		const updatePasswordCustomer = new UpdatePasswordCustomer();
		const updatePassword = await updatePasswordCustomer.execute({ id, old_password, password, city, region_name, country });

		return response.status(200).json({ status: 'success', updatePassword });
	}

	static async removeAvatarCustomer(request: Request, response: Response): Promise<Response>
	{
		const id = request.userId;
		const avatar = request.body.avatar;

		const removeAvatarCustomerService = new RemoveAvatarCustomerService();
		const avatarRemoved = await removeAvatarCustomerService.execute({ id, avatar });

		return response.status(200).json({ status: 'success', message: avatarRemoved });
	}

	static async reset(request: Request, response: Response)
	{
		const{ token, new_password } = request.body;

		const resetPasswordService = new ResetPasswordService();
		const passwordReset = await resetPasswordService.execute({ token, new_password });

		return response.status(200).json({ status: 'success', message: passwordReset });
	}

	static async checkHasCompany(request: Request, response: Response)
	{
		const id = request.userId;

		const checkHasCompanyService = new CheckHasCompanyService();
		const hasCompany = await checkHasCompanyService.execute({ id });

		return response.status(200).json({ status: 'success', message: hasCompany });
	}

	static async acceptInfo(request: Request, response: Response)
	{
		const id = request.userId;
		const { accept_newsletter, info_payment } = request.body;

		const paymentNewsletterService = new PaymentNewsletterService();
		const info = await paymentNewsletterService.execute({ id, accept_newsletter, info_payment });

		return response.status(200).json({ status: 'success', message: info });
	}
}

export default CustomerController;
import { Request, Response } from 'express';
import UpdateEmailCustomer from '../services/customer/UpdateEmailCustomerService';
import UpdatePasswordCustomer from '../services/customer/UpdatePasswordCustomerService';
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
import ActiveAccountClientService from '../services/customer/ActiveAccountClientService';
import SendForgotEmailService from '../services/session/SendForgotEmailService';
import ResendActivateAccountService from '../services/customer/ResendActivateAccountService';
import Customer from '../entities/Customer';
import UpdateEmailCustomerService from '../services/customer/UpdateEmailCustomerService';
import ListCustomerByCompanyService from '../services/customer/ListCustomerByCompanyService';

class CustomerController
{
	static async create(request: Request, response: Response): Promise<Response>
	{
		const { first_name, surname, position, phone, email, password, accept_terms, type_customer, company } = request.body;

		const createCustomerService: CreateCustomerService = new CreateCustomerService();
		const newCustomer: string | object = await createCustomerService.execute({ first_name, surname, position, phone, email, password, accept_terms, type_customer, company });

		return response.status(201).json({ status: 'success', message: newCustomer });
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const listCustomerService: ListCustomerService = new ListCustomerService();
		const listCustomers: Customer[] | undefined = await listCustomerService.execute();

		return response.status(200).json(listCustomers);
	}

	static async listCustomerByCompany(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const listCustomerByCompanyService: ListCustomerByCompanyService = new ListCustomerByCompanyService();
		const listCustomerByCompany: object = await listCustomerByCompanyService.execute({company});

		return response.status(200).json(listCustomerByCompany);
	}

	static async show(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.params;

		const showCustomerService: ShowCustomerService = new ShowCustomerService();
		const showCustomer: Customer | null = await showCustomerService.execute({ id });

		return response.status(200).json(showCustomer);
	}

	static async update(request: Request, response: Response): Promise<Response>
	{
		const id: string = request.userId;

		const { first_name, surname, position, phone } = request.body;

		const updateCustomerService: UpdateCustomerService = new UpdateCustomerService();
		const updateCustomer: string = await updateCustomerService.execute({ id, first_name, surname, position, phone });

		return response.status(201).json({ status: 'success', message: updateCustomer });
	}

	static async remove(request: Request, response: Response): Promise<Response>
	{
		const id: string = request.userId;
		const { email, password } = request.body;

		const removeCustomerService: RemoveCustomerService = new RemoveCustomerService();
		const customerRemoved: string = await removeCustomerService.execute({ id, email, password });

		return response.status(200).json({ status: 'success', message: customerRemoved });
	}

	static async showDetailsCustomer(request: Request, response: Response): Promise<Response>
	{
		const id: number = request.userId;

		const showDetailsCustomerService: ShowDetailCustomerService= new ShowDetailCustomerService();
		const details: object = await showDetailsCustomerService.execute({ id });

		return response.status(200).json(details);
	}

	static async updateEmailCustomer(request: Request, response: Response): Promise<Response>
	{
		const id: string = request.userId;

		const { password, new_email, agent_user, system_user, city_locate, country_name, country_capital } = request.body;

		const updateEmailCustomer: UpdateEmailCustomerService = new UpdateEmailCustomer();
		const updateEmail: string = await updateEmailCustomer.execute({ id, password, new_email, agent_user, system_user, city_locate, country_name, country_capital });

		return response.status(200).json({ status: 'success', message: updateEmail });
	}

	static async updatePasswordCustomer(request: Request, response: Response): Promise<Response>
	{
		const{ old_password, new_password, agent_user, system_user, city_locate, country_name, country_capital } = request.body;

		const id: string = request.userId;
		const password: string = new_password;

		const updatePasswordCustomer: UpdatePasswordCustomer = new UpdatePasswordCustomer();
		const updatePassword: string = await updatePasswordCustomer.execute({ id, old_password, password, agent_user, system_user, city_locate, country_name, country_capital });

		return response.status(200).json({ status: 'success', updatePassword });
	}

	static async removeAvatarCustomer(request: Request, response: Response): Promise<Response>
	{
		const id: string = request.userId;
		const avatar: string = request.body.avatar;

		const removeAvatarCustomerService: RemoveAvatarCustomerService = new RemoveAvatarCustomerService();
		const avatarRemoved: string = await removeAvatarCustomerService.execute({ id, avatar });

		return response.status(200).json({ status: 'success', message: avatarRemoved });
	}

	static async reset(request: Request, response: Response): Promise<Response>
	{
		const{ token, new_password } = request.body;

		const resetPasswordService: ResetPasswordService = new ResetPasswordService();
		const passwordReset: string = await resetPasswordService.execute({ token, new_password });

		return response.status(200).json({ status: 'success', message: passwordReset });
	}

	static async checkHasCompany(request: Request, response: Response): Promise<Response>
	{
		const id: string = request.userId;
		console.log(id);

		const checkHasCompanyService: CheckHasCompanyService = new CheckHasCompanyService();
		const hasCompany: string = await checkHasCompanyService.execute({ id });

		return response.status(200).json({ status: 'success', message: hasCompany });
	}

	static async acceptInfo(request: Request, response: Response): Promise<Response>
	{
		const id: string = request.userId;
		const { accept_newsletter, info_payment } = request.body;

		const paymentNewsletterService: PaymentNewsletterService = new PaymentNewsletterService();
		const info: object = await paymentNewsletterService.execute({ id, accept_newsletter, info_payment });

		return response.status(200).json({ status: 'success', message: info });
	}

	static async ative(request: Request, response: Response): Promise<Response>
	{
		const { token, id } = request.body;

		const activeAccountClientService: ActiveAccountClientService = new ActiveAccountClientService();
		const accountActivated: string | object = await activeAccountClientService.execute({ token, id });

		return response.status(200).json(accountActivated);
	}

	static async send(request: Request, response: Response): Promise<Response>
	{
		const { email } =  request.body;
		const sendForgotEmailService: SendForgotEmailService = new SendForgotEmailService();
		const emailSent = await sendForgotEmailService.execute({ email });

		return response.status(200).json({ status: 'success', message: emailSent });
	}

	static async resendEmail(request: Request, response: Response): Promise<Response>
	{
		const { email } = request.body;

		const resendActivateAccountService: ResendActivateAccountService = new ResendActivateAccountService();
		const resendEmail: string = await resendActivateAccountService.execute({ email });

		return response.status(200).json({ status: 'success', resendEmail});
	}
}

export default CustomerController;
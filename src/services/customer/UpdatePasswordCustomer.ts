import { hash, compare } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type UpdateRequest =
{
	id: string;
	old_password: string;
	password: string;
}

class UpdatePasswordCustomer
{
	public async execute({ id, old_password, password }: UpdateRequest): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Cliente não cadastrado.');
		}

		const verifyPassword = await compare(old_password, customer.password);
		if(!verifyPassword) {
			throw new BadRequestError('Senha antiga desconhecida.');
		}

		const newPassword = await hash(password, 8);

		customer.old_password = newPassword;
		customer.password = newPassword;

		await customerRepository.save(customer);

		return 'Senha atualizada.';
	}
}

export default UpdatePasswordCustomer;
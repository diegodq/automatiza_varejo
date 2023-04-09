import { compare } from "bcryptjs";
import customerRepository from "../../repositories/customerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type UpdateRequest =
{
	id: string;
	password: string;
	email: string;
}

class UpdateEmailCustomer
{
	public async execute({ id, password, email }: UpdateRequest): Promise<string>
	{
		const customer = await customerRepository.findOneBy({ id: Number(id) });
		if(!customer) {
			throw new BadRequestError('Usuário não existe');
		}

		const comparePassword = await compare(password, customer.password);
		if(!comparePassword) {
			throw new BadRequestError('Senha incorreta.');
		}

		const emailExists = await customerRepository.findOneBy({ email  });
		if(emailExists) {
			throw new BadRequestError('Um usuário com este email já está cadastrado.');
		}

		if (customer.email == email) {
			throw new BadRequestError(' Usuário já está cadastrado.');
		}

		customer.email = email;
		await customerRepository.save(customer);

		return 'E-mail atualizado';
	}
}

export default UpdateEmailCustomer;
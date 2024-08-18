import contactUsRepository from "../../repositories/contactUsRepository";
import ContactUs from '../../entities/ContactUs';

type NewMessage =
{
	name: string;
	email: string;
	phone: string;
	message: string;
}

class CreateNewMessageService
{
	public async execute({ name, email, phone, message }: NewMessage): Promise<string>
	{
		const newMessage: ContactUs = contactUsRepository.create({ name, email, phone, message });
		await contactUsRepository.save(newMessage);

		return 'Sua mensagem foi enviada e responderemos o mais breve possível.';
	}
}

export default CreateNewMessageService;
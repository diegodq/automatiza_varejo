import contactUsRepository from "../../repositories/contactUsRepository";

type NewMessage =
{
	name: string;
	email: string;
	subject: string;
	message: string;
}

class CreateNewMessageService
{
	public async execute({ name, email, subject, message }: NewMessage): Promise<string>
	{
		const newMessage = contactUsRepository.create({ name, email, subject, message });
		await contactUsRepository.save(newMessage);

		return 'Sua mensagem foi enviada e responderemos o mais breve possível.';
	}
}

export default CreateNewMessageService;
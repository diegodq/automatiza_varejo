import answerRepository from "../../repositories/answerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Answer from '../../entities/Answer';

type AnswerRequest =
{
	id: string;
	client_name: string;
	client_phone: string;
	answer: string;
}

class EditAnswerService
{
	public async execute({ id, answer, client_name, client_phone }: AnswerRequest): Promise<string>
	{
		const answerExists: Answer | null = await answerRepository.findOneBy({ id: Number(id) });
		if(!answerExists) {
			throw new BadRequestError('no-answers');
		}

		answerExists.answer = answer;
		answerExists.client_name = client_name;
		answerExists.client_phone = client_phone;

		await answerRepository.save(answerExists);

		return 'Pergunta atualizada.';
	}
}

export default EditAnswerService;
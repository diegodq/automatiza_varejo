import answerRepository from "../../repositories/answerRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type AnswerRequest =
{
	id: string;
	answer: string;
}

class EditAnswerService
{
	public async execute({ id, answer }: AnswerRequest)
	{
		const answerExists = await answerRepository.findOneBy({ id: Number(id) });
		if(!answerExists) {
			throw new BadRequestError('no-answers');
		}

		answerExists.answer = answer;
		await answerRepository.save(answerExists);

		return 'Pergunta atualizada.';
	}
}

export default EditAnswerService;
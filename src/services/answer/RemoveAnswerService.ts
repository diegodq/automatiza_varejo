import answerRepository from "../../repositories/answerRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import paramsConfig from "../../params/paramsConfig";
import Answer from '../../entities/Answer';

type AnswerRequest =
{
	id: string;
}

class RemoveAnswerService
{
	public async execute({ id }: AnswerRequest): Promise<string>
	{
		const answer: Answer | null = await answerRepository.findOneBy({ id: Number(id) });
		if(!answer) {
			throw new BadRequestError('no-answer');
		}

		if(!paramsConfig.params.allowRemoveAnswers) {
			throw new BadRequestError('Exlusão de respostas não permitido');
		}

		await answerRepository.remove(answer);
		return 'Pergunta removida.';
	}
}

export default RemoveAnswerService;
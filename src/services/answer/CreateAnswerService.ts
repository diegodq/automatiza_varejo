import Question from "../../entities/Question";
import answerRepository from "../../repositories/answerRepository";

type AnswerRequest =
{
	answer: string;
	question: Question
}

class CreateAnswerService
{
	public async execute({ answer, question }: AnswerRequest): Promise<string>
	{
		const newAnswer = answerRepository.create({ answer, question });
		await answerRepository.save(newAnswer);

		return 'Resposta enviada.';
	}
}

export default CreateAnswerService;
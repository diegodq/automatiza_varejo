import Question from "../../entities/Question";
import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type TopicRequest =
{
	id: string;
	new_status: string;
}

class ChangeStatusQuestionService
{
	public async execute({ id, new_status }: TopicRequest): Promise<string>
	{
		const questionExist: Question | null = await questionRepository.findOneBy({ id: Number(id) });
		if(!questionExist) {
			throw new BadRequestError('no-question');
		}

		questionExist.status = Number(new_status);
		await questionRepository.save(questionExist);

		return 'Status atualizado';
	}
}

export default ChangeStatusQuestionService;
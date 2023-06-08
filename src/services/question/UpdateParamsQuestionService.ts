import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type ParamsType =
{
	id: number;
	position: number;
	mandatory_question: number;
	finish_research: number;
}

class UpdateParamsQuestionService
{
	public async execute({ id, position, mandatory_question, finish_research }: ParamsType): Promise<string | undefined>
	{
		const questionExists = await questionRepository.findOneBy({ id });
		if(!questionExists) {
			throw new BadRequestError('no-question');
		}

		questionExists.position = position;
		questionExists.mandatory_question = mandatory_question;
		questionExists.finish_research = finish_research;

		await questionRepository.save(questionExists);
		return 'params-updated';
	}
}

export default UpdateParamsQuestionService;
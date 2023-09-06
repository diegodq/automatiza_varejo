import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import paramsConfig from "../../params/paramsConfig";

type QuestionRequest =
{
	id: string;
}

class RemoveQuestionService
{
	public async execute({ id }: QuestionRequest)
	{
		const question = await questionRepository.findOneBy({ id: Number(id) });
		if(!question) {
			throw new BadRequestError('no-question');
		}

		if(!paramsConfig.params.allowRemoveQuestions) {
			throw new BadRequestError('not-allowed-delete-question');
		}

		await questionRepository.remove(question);
		return 'question-removed';
	}
}

export default RemoveQuestionService;
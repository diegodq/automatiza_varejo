import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Question from '../../entities/Question';
import paramsConfig from "../../params/paramsConfig";
import QuestionGroupMapping from '../../entities/QuestionGroupMapping';
import questionGroupMappingRepository from '../../repositories/questionGroupMappingRepository';

type QuestionRequest =
{
	id: string;
}

class RemoveQuestionService
{
	public async execute({ id }: QuestionRequest): Promise<string>
	{
		if(!paramsConfig.params.allowRemoveQuestions) {
			throw new BadRequestError('not-allowed-delete-question');
		}

		const question: Question | null = await questionRepository.findOneBy({ id: Number(id) });
		if(!question) {
			throw new BadRequestError('no-question');
		}

		const checkQuestion: QuestionGroupMapping | null = await questionGroupMappingRepository.findOne({ where: { question: { id: Number(id)} } });
		if(checkQuestion)
			throw new BadRequestError('this-question-is-already-being-used');

		await questionRepository.remove(question);
		return 'question-removed';
	}
}

export default RemoveQuestionService;
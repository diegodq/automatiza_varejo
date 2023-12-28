import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import paramsQuestionRepository from "../../repositories/paramsQuestionRepository";
import Question from '../../entities/Question';
import ParamsQuestions from '../../entities/ParamsQuestions';

type ParamTypes =
{
	question_id: string;
}

class ListParamsByQuestionService
{
	public async execute({ question_id }: ParamTypes): Promise<object>
	{
		const id = Number(question_id);

		const questionExists: Question | null = await questionRepository.findOneBy({ id: Number( question_id ) });
		if(!questionExists) {
			throw new BadRequestError('no-question');
		}

		const listParams: ParamsQuestions[] = await paramsQuestionRepository.find({ where: { question: { id } } });
		if(!listParams) {
			throw new BadRequestError('no-params-question');
		}

		return listParams;
	}
}

export default ListParamsByQuestionService;
import { BadRequestError } from "../../utils/ApiErrors";
import questionRepository from "../../repositories/questionRepository";
import paramsQuestionRepository from "../../repositories/paramsQuestionRepository";
import Question from "../../entities/Question";
import ParamsQuestions from '../../entities/ParamsQuestions';

type ParamsType =
{
	option_one: string,
	option_two: string,
	import_type: string,
	position: number,
	mandatory_question: number,
	finish_research: number,
	question: Question;
}

class CreateParamsQuestionService
{
	public async execute(params: ParamsType[]): Promise<string>
	{
		const question: Question[] = params.map(param => { return param.question });

		const questionExists: Question | null = await questionRepository.findOneBy({ id: Number(question[0]) });
		if(!questionExists) {
			throw new BadRequestError('no-questions');
		}

		const storeParams: ParamsQuestions[] = paramsQuestionRepository.create(params);

		await paramsQuestionRepository.save(storeParams);
		return 'params-added';
	}
}

export default CreateParamsQuestionService;
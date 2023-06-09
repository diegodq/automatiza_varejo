import { BadRequestError } from "../../utils/ApiErrors";
import questionRepository from "../../repositories/questionRepository";
import paramsQuestionRepository from "../../repositories/paramsQuestionRepository";
import Question from "../../entities/Question";

type ParamsType =
{
	option_one: string,
	option_two: string,
	import_type: string,
	question: Question;
}

class CreateParamsQuestionService
{
	public async execute(params: ParamsType[]): Promise<string>
	{
		const question = params.map(param => { return param.question });

		const questionExists = await questionRepository.findOneBy({ id: Number(question[0]) });
		if(!questionExists) {
			throw new BadRequestError('no-questions');
		}

		const storeParams = paramsQuestionRepository.create(params);

		await paramsQuestionRepository.save(storeParams);
		return 'params-added';
	}
}

export default CreateParamsQuestionService;
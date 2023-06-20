import paramsQuestionRepository from "../../repositories/paramsQuestionRepository";
import Question from "../../entities/Question";
import { BadRequestError } from "../../utils/ApiErrors";

type ParamsRequest =
{
	option_one: string;
	option_two: string;
	input_type: string;
	position: number;
	question: Question;
}

class UpdateParamsQuestionService
{
	public async execute(params: ParamsRequest[]): Promise<string>
	{
		const param = params.map(param => { return param.question });
		const id = Number(param[0]);

		const paramsExists = await paramsQuestionRepository.findOne({ where: { question: { id }} });
		if(!paramsExists) {
			throw new BadRequestError('no-params-question');
		}

		const position = params.map(param => { return param.position })
		if(position.length <= 0) {
			throw new BadRequestError('not-allowed-zero');
		}

		params.forEach(param => {
			paramsExists.option_one = param.option_one,
			paramsExists.option_two = param.option_two,
			paramsExists.position = param.position;
		});

		await paramsQuestionRepository.save(paramsExists);

		return 'params-updated';
	}
}

export default UpdateParamsQuestionService;
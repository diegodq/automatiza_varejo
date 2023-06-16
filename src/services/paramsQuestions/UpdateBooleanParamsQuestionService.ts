import paramsQuestionRepository from "../../repositories/paramsQuestionRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type ParamsRequest =
{
	id_params: string;
	finish_research: number,
	mandatory_question: number,
	position: number,
}

class UpdateBooleanParamsQuestionService
{
	public async execute({ id_params, finish_research, mandatory_question, position }: ParamsRequest): Promise<string>
	{
		const paramsExists = await paramsQuestionRepository.findOneBy({ id: Number(id_params) });
		if(!paramsExists) {
			throw new BadRequestError('no-params-question');
		}

		if(position <= 0) {
			throw new BadRequestError('not-allowed-zero');
		}

		paramsExists.finish_research = finish_research;
		paramsExists.mandatory_question = mandatory_question;
		paramsExists.position = position;

		await paramsQuestionRepository.save(paramsExists);

		return 'params-updated';
	}
}

export default UpdateBooleanParamsQuestionService;
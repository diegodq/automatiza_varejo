import questionRepository from "../../repositories/questionRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import paramsQuestionRepository from "../../repositories/paramsQuestionRepository";

type ParamTypes =
{
	question_id: string;
}

class ListParamsByQuestionService
{
	public async execute({ question_id }: ParamTypes): Promise<object>
	{
		const id = Number(question_id);

		const questionExists = await questionRepository.findOneBy({ id: Number( question_id ) });
		if(!questionExists) {
			throw new BadRequestError('no-question');
		}

		const listParams = await paramsQuestionRepository.find({ where: { question: { id } } });
		if(!listParams) {
			throw new BadRequestError('no-params-question');
		}

		return listParams;
	}
}

export default ListParamsByQuestionService;
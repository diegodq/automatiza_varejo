import paramsProductRepository from '../../repositories/paramsProductRepository';
import { BadRequestError } from '../../utils/ApiErrors';

type QuestionRequest =
{
	company: number;
}

class ListAnchorQuestionService
{
	public async execute({ company }: QuestionRequest): Promise<string>
	{
		const id = Number(company);

		const anchorQuestion = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!anchorQuestion) {
			throw new BadRequestError('no-anchor-question');
		}

		return anchorQuestion.anchor_question;
	}
}

export default ListAnchorQuestionService;
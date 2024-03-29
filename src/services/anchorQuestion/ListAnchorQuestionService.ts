import paramsProductRepository from '../../repositories/paramsProductRepository';
import { BadRequestError } from '../../utils/ApiErrors';
import ParamsProduct from '../../entities/ParamsProduct';
import convertUserIdInCompanyId from '../../utils/convertUserIdInCompanyId';

type QuestionRequest =
{
	company: number;
}

class ListAnchorQuestionService
{
	public async execute({ company }: QuestionRequest): Promise<string>
	{
		const id = await convertUserIdInCompanyId(Number(company));

		const anchorQuestion: ParamsProduct | null = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!anchorQuestion) {
			throw new BadRequestError('no-anchor-question');
		}

		return anchorQuestion.anchor_question;
	}
}

export default ListAnchorQuestionService;
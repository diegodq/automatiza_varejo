import { BadRequestError } from "../../utils/ApiErrors";
import questionRepository from "../../repositories/questionRepository";

type QuestionRequest =
{
	id: number;
}

class ListAnchorQuestionService
{
	public async execute({ id }: QuestionRequest): Promise<object>
	{
		const question = await questionRepository.findOne({ where: { company: { id } }, relations: { company: true } });

		if(!question) {
			throw new BadRequestError('no-question');
		}

		if(!question.anchor_question) {
			throw new BadRequestError('no-anchor-question');
		}

		if(!question.company.logo_company) {
			throw new BadRequestError('no-logo');
		}

		if(process.env.APP_MODE == 'development')
			return { anchorQuestion: question.anchor_question, logo: process.env.BASE_URL + ':' + process.env.SERVER_PORT + '/logo/' + question.company.logo_company };
		else
			return { anchorQuestion: question.anchor_question, logo: process.env.IMG_URL + '/logo/' + question.company.logo_company };
	}
}

export default ListAnchorQuestionService;
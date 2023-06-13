import paramsProduct from "../../repositories/paramsProductsRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	id_params: number;
}

class ListAnchorQuestionService
{
	public async execute({ id_params }: QuestionRequest): Promise<string>
	{
		const anchorQuestionExists = await paramsProduct.findOneBy({ id: id_params });
		if(!anchorQuestionExists) {
			throw new BadRequestError('no-params');
		}

		if(!anchorQuestionExists.anchor_question) {
			throw new BadRequestError('no-anchor-question');
		}

		return anchorQuestionExists.anchor_question;
	}
}

export default ListAnchorQuestionService;
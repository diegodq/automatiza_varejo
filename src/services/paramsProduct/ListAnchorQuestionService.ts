import productRepository from "../../repositories/productRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type QuestionRequest =
{
	product_id: string;
}

class ListAnchorQuestionService
{
	public async execute({ product_id }: QuestionRequest): Promise<string>
	{
		const anchorQuestionExists = await productRepository.findOneBy({ id: Number(product_id) });
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
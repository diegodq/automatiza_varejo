import { BadRequestError } from "../../utils/ApiErrors";
import paramsProduct from "../../repositories/paramsProductsRepository";
import productRepository from "src/repositories/productRepository";

type TopicRequest =
{
	id_params: number;
	anchor_question: string;
}

class ModifyAnchorQuestionService
{
	public async execute({ id_params, anchor_question }: TopicRequest): Promise<string>
	{
		const anchorQuestionExists = await productRepository.findOneBy({ id: id_params });
		if(!anchorQuestionExists) {
			throw new BadRequestError('no-anchor-question');
		}

		if(anchorQuestionExists.anchor_question == anchor_question) {
			throw new BadRequestError('anchor-question-exists');
		}

		anchorQuestionExists.anchor_question = anchor_question;
		await paramsProduct.save(anchorQuestionExists);

		return anchorQuestionExists.anchor_question;
	}
}

export default ModifyAnchorQuestionService;
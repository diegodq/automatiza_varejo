import { BadRequestError } from "../../utils/ApiErrors";
import productRepository from "../../repositories/productRepository";


type TopicRequest =
{
	id_product: number;
	anchor_question: string;
}

class ModifyAnchorQuestionService
{
	public async execute({ id_product, anchor_question }: TopicRequest): Promise<string>
	{
		const anchorQuestionExists = await productRepository.findOneBy({ id: id_product });
		if(!anchorQuestionExists) {
			throw new BadRequestError('no-product');
		}

		if(anchorQuestionExists.anchor_question == anchor_question) {
			throw new BadRequestError('anchor-question-exists');
		}

		anchorQuestionExists.anchor_question = anchor_question;
		await productRepository.save(anchorQuestionExists);

		return anchorQuestionExists.anchor_question;
	}
}

export default ModifyAnchorQuestionService;
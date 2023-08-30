import paramsProductRepository from '../../repositories/paramsProductRepository';
import { BadRequestError } from '../../utils/ApiErrors';

type QuestionRequest =
{
	company: number;
}

class ListBackgroundColorService
{
	public async execute({ company }: QuestionRequest): Promise<string>
	{
		const id = Number(company);

		const fontColor = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!fontColor) {
			throw new BadRequestError('no-font-color');
		}

		return fontColor.font_color;
	}
}

export default ListBackgroundColorService;
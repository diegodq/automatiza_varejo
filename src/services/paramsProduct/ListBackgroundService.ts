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

		const backgroundColor = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!backgroundColor) {
			throw new BadRequestError('no-background-color');
		}

		return backgroundColor.background_color;
	}
}

export default ListBackgroundColorService;
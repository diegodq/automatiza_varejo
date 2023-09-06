import paramsProductRepository from 'src/repositories/paramsProductRepository';
import { BadRequestError } from "../../utils/ApiErrors";
import Company from '../../entities/Company';

type BackgroundColorType =
{
	company: Company;
	background_color: string;
}

class UpdateBackgroundColorService
{
	public async execute({ company, background_color }: BackgroundColorType): Promise<string | undefined>
	{
		const id = Number(company);
		
		const backgroundColor = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!backgroundColor) {
			throw new BadRequestError('no-params');
		}

		backgroundColor.background_color = background_color;
		await paramsProductRepository.save(backgroundColor);

		return 'background-color-updated';
	}
}

export default UpdateBackgroundColorService;
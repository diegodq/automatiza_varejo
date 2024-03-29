import paramsProductRepository from '../../repositories/paramsProductRepository';
import { BadRequestError } from "../../utils/ApiErrors";
import Company from '../../entities/Company';
import ParamsProduct from '../../entities/ParamsProduct';
import convertUserIdInCompanyId from '../../utils/convertUserIdInCompanyId';

type BackgroundColorType =
{
	company: Company;
	background_color: string;
}

class UpdateBackgroundColorService
{
	public async execute({ company, background_color }: BackgroundColorType): Promise<string | undefined>
	{
		const id = await convertUserIdInCompanyId(Number(company));

		const backgroundColor: ParamsProduct | null = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!backgroundColor) {
			throw new BadRequestError('no-params');
		}

		backgroundColor.background_color = background_color;
		await paramsProductRepository.save(backgroundColor);

		return 'background-color-updated';
	}
}

export default UpdateBackgroundColorService;
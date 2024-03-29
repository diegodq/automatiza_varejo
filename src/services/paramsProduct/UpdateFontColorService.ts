import paramsProductRepository from "../../repositories/paramsProductRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from "../../entities/Company";
import ParamsProduct from '../../entities/ParamsProduct';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type FontColorType =
{
	company: Company;
	font_color: string;
}
class UpdateFontColorService
{
	public async execute({ company, font_color }: FontColorType): Promise<string | undefined>
	{
		const id = await convertUserIdInCompanyId(Number(company));

		const fontColor: ParamsProduct | null = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!fontColor) {
			throw new BadRequestError('no-params');
		}

		fontColor.font_color = font_color;
		await paramsProductRepository.save(fontColor);

		return 'font-color-updated';
	}
}

export default UpdateFontColorService;
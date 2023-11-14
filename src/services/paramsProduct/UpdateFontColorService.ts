import paramsProductRepository from "../../repositories/paramsProductRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from "../../entities/Company";

type FontColorType =
{
	company: Company;
	font_color: string;
}
class UpdateFontColorService
{
	public async execute({ company, font_color }: FontColorType): Promise<string | undefined>
	{
		const id = Number(company);

		const fontColor = await paramsProductRepository.findOne({ where: { company: { id } } });
		if(!fontColor) {
			throw new BadRequestError('no-params');
		}

		fontColor.font_color = font_color;
		await paramsProductRepository.save(fontColor);

		return 'font-color-updated';
	}
}

export default UpdateFontColorService;
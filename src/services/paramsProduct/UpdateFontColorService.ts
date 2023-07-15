import Product from "../../entities/Product";
import paramsProduct from "../../repositories/paramsProductsRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type FontColorType =
{
	id_params: Product;
	font_color: string;
}
class UpdateFontColorService
{
	public async execute({ id_params, font_color }: FontColorType): Promise<string | undefined>
	{
		const fontColor = await paramsProduct.findOneBy({ id: Number(id_params) });
		if(!fontColor) {
			throw new BadRequestError('no-params');
		}

		fontColor.font_color = font_color;
		await paramsProduct.save(fontColor);

		return 'font-color-updated';
	}
}

export default UpdateFontColorService;
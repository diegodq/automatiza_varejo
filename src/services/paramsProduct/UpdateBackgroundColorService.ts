import paramsProduct from "../../repositories/paramsProductsRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type BackgroundColorType =
{
	id_params: string;
	background_color: string;
}

class UpdateBackgroundColorService
{
	public async execute({ id_params, background_color }: BackgroundColorType): Promise<string | undefined>
	{
		const backgroundColor = await paramsProduct.findOneBy({ id: Number(id_params) });
		if(!backgroundColor) {
			throw new BadRequestError('no-params');
		}

		backgroundColor.background_color = background_color;
		await paramsProduct.save(backgroundColor);

		return 'background-color-updated';
	}
}

export default UpdateBackgroundColorService;
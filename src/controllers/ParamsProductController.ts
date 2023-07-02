import { Request, Response } from "express";
import UpdateFontColorService from "../services/paramsProduct/UpdateFontColorService";
import UpdateBackgroundColorService from "../services/paramsProduct/UpdateBackgroundColorService";
import ModifyAnchorQuestionService from "../services/paramsProduct/ModifyAnchorQuestionService";
import AddParamsProductService from "../services/paramsProduct/AddParamsProductService";
import ListParamsByProductService from "../services/paramsProduct/ListParamsByProductService";
import ModifyPassingTreeService from "../services/paramsProduct/ModifyPassingTreeService";

class ParamsProductController
{
	static async addParams(request: Request, response: Response): Promise<Response>
	{
		const { background_color, font_color, product } = request.body;

		const addParamsProductService = new AddParamsProductService();
		const newParams = await addParamsProductService.execute({ background_color, font_color, product });

		return response.status(200).json({ status: 'success', message: newParams });
	}

	static async updateFontColor(request: Request, response: Response ): Promise<Response>
	{
		const { id_params, font_color } = request.body;

		const updateFontColorService = new UpdateFontColorService();
		const fontColor = await updateFontColorService.execute({ id_params, font_color });

		return response.status(200).json({ status: 'success', message: fontColor });
	}

	static async updateBackgroundColor(request: Request, response: Response): Promise<Response>
	{
		const { id_params, background_color } = request.body;

		const updateBackgroundColorService = new UpdateBackgroundColorService();
		const backgroundColor = await updateBackgroundColorService.execute({ id_params, background_color });

		return response.status(200).json({ status: 'success', message: backgroundColor });
	}

	static async changeAnchorQuestion(request: Request, response: Response): Promise<Response>
	{
		const { id_params, anchor_question } = request.body;

		const modifyAnchorQuestionService = new ModifyAnchorQuestionService();
		const anchorQuestion = await modifyAnchorQuestionService.execute({ id_params, anchor_question });

		return response.status(200).json({ status: 'success', message: anchorQuestion });
	}

	static async changePassingTree(request: Request, response: Response): Promise<Response>
	{
		const { id_params, passing_tree } = request.body;

		const modifyPassingTreeService = new ModifyPassingTreeService();
		const anchorQuestion = await modifyPassingTreeService.execute({ id_params, passing_tree });

		return response.status(200).json({ status: 'success', message: anchorQuestion });
	}

	static async listParams(request: Request, response: Response): Promise<Response>
	{
		const { product_id } = request.params;

		const listParamsByProductService = new ListParamsByProductService();
		const listParams = await listParamsByProductService.execute({ product_id });

		return response.status(200).json({ status: 'success', listParams });
	}
}

export default ParamsProductController;
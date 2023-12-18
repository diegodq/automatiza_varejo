import { Request, Response } from "express";
import AddAnchorQuestionService from "../services/anchorQuestion/AddAnchorQuestionService";
import ListAnchorQuestionService from "../services/anchorQuestion/ListAnchorQuestionService";
import UpdateAnchorQuestionService from "../services/anchorQuestion/UpdateAnchorQuestionService";
import UpdateFontColorService from "../services/paramsProduct/UpdateFontColorService";
import UpdateBackgroundColorService from "../services/paramsProduct/UpdateBackgroundColorService";
import ModifyPassingTreeService from "../services/paramsProduct/ModifyPassingTreeService";
import ListParamsProductService from "../services/paramsProduct/ListParamsProductService";
import UpdateLockByIpService from "../services/paramsProduct/updateLockByIpService";

class ParamsProductController
{
	static async addAnchorQuestion(request: Request, response: Response): Promise<Response>
	{
		const company: any = request.userId;

		const { anchor_question } = request.body;

		const addAnchorQuestionService: AddAnchorQuestionService = new AddAnchorQuestionService();
		const anchorQuestion: string = await addAnchorQuestionService.execute({ company, anchor_question });

		return response.status(200).json({ status: 'success', anchorQuestion: anchorQuestion });
	}

	static async listAnchorQuestion(request: Request, response: Response): Promise<Response>
	{
		const company: any = request.userId;

		const listAnchorQuestion: ListAnchorQuestionService = new ListAnchorQuestionService();
		const anchorQuestion: any = await listAnchorQuestion.execute({ company });

		return response.status(200).json({ status: 'success', message: anchorQuestion });
	}

	static async updateAnchorQuestion(request: Request, response: Response): Promise<Response>
	{
		const company: any = request.userId;

		const { anchor_question } = request.body;

		const updateAnchorQuestionService: UpdateAnchorQuestionService = new UpdateAnchorQuestionService();
		const anchorQuestion: string = await updateAnchorQuestionService.execute({ company, anchor_question });

		return response.status(200).json({ status: 'success', anchorQuestion: anchorQuestion });
	}

	static async updateBackgroundColor(request: Request, response: Response): Promise<Response>
	{
		const company: any = request.userId;

		const { background_color } = request.body;

		const updateBackgroundColorService: UpdateBackgroundColorService = new UpdateBackgroundColorService();
		const backgroundColor: string | undefined = await updateBackgroundColorService.execute({ company, background_color });

		return response.status(200).json({ status: 'success', message: backgroundColor });
	}

	static async updateFontColor(request: Request, response: Response ): Promise<Response>
	{
		const company: any = request.userId;
		const { font_color } = request.body;

		const updateFontColorService: UpdateFontColorService = new UpdateFontColorService();
		const fontColor: string | undefined = await updateFontColorService.execute({ company, font_color });

		return response.status(200).json({ status: 'success', message: fontColor });
	}

	static async changePassingTree(request: Request, response: Response): Promise<Response>
	{
		const company: any = request.userId;

		const { passing_tree } = request.body;

		const modifyPassingTreeService: ModifyPassingTreeService = new ModifyPassingTreeService();
		const anchorQuestion: string = await modifyPassingTreeService.execute({ company, passing_tree });

		return response.status(200).json({ status: 'success', message: anchorQuestion });
	}

	static async listParamsProduct(request: Request, response: Response): Promise<Response> 
	{
		const company: number = request.userId;

		const listParamsProductService: ListParamsProductService = new ListParamsProductService();
		const resultQuery: object = await listParamsProductService.execute({ company });

		return response.status(200).json({ status: 'sucess', message: resultQuery });
	}

	static async updateLockByIp(request: Request, response: Response): Promise<Response>
	{
		const company: number = request.userId;
		const { lock_by_ip } = request.body;

		const updateLockByIpService: UpdateLockByIpService = new UpdateLockByIpService();
		const resultQuery: string = await updateLockByIpService.execute({ company, lock_by_ip });

		return response.status(200).json({ status: 'success', message: resultQuery });
	}
}

export default ParamsProductController;
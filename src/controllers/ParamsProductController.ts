import { Request, Response } from "express";
import AddAnchorQuestionService from "../services/anchorQuestion/AddAnchorQuestionService";
import ListAnchorQuestionService from "../services/anchorQuestion/ListAnchorQuestionService";
import ListBackgroundColorService from "src/services/paramsProduct/ListBackgroundService";
import ListFontColorService from "src/services/paramsProduct/ListFontColorService";
import ListPassingTreeService from "src/services/paramsProduct/ListPassingTreeService";
import UpdateAnchorQuestionService from "../services/anchorQuestion/UpdateAnchorQuestionService";
import UpdateFontColorService from "../services/paramsProduct/UpdateFontColorService";
import UpdateBackgroundColorService from "../services/paramsProduct/UpdateBackgroundColorService";
import ModifyPassingTreeService from "../services/paramsProduct/ModifyPassingTreeService";


class ParamsProductController
{
	static async addAnchorQuestion(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const { anchor_question } = request.body;

		const addAnchorQuestionService = new AddAnchorQuestionService();
		const anchorQuestion = await addAnchorQuestionService.execute({ company, anchor_question });

		return response.status(200).json({ status: 'success', anchorQuestion: anchorQuestion });
	}

	static async listAnchorQuestion(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const listAnchorQuestion = new ListAnchorQuestionService();
		const anchorQuestion = await listAnchorQuestion.execute({ company });

		return response.status(200).json({ status: 'success', message: anchorQuestion });
	}

	static async updateAnchorQuestion(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const { anchor_question } = request.body;

		const updateAnchorQuestionService = new UpdateAnchorQuestionService();
		const anchorQuestion = await updateAnchorQuestionService.execute({ company, anchor_question });

		return response.status(200).json({ status: 'success', anchorQuestion: anchorQuestion });
	}

	static async listBackgroundColor(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const listBackgroundColor = new ListBackgroundColorService();
		const backgroundColor = await listBackgroundColor.execute({ company });

		return response.status(200).json({ status: 'success', message: backgroundColor });
	}

	static async updateBackgroundColor(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;
		
		const { background_color } = request.body;

		const updateBackgroundColorService = new UpdateBackgroundColorService();
		const backgroundColor = await updateBackgroundColorService.execute({ company, background_color });

		return response.status(200).json({ status: 'success', message: backgroundColor });
	}

	static async listFontColor(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const listfontColor = new ListFontColorService();
		const fontColor = await listfontColor.execute({ company });

		return response.status(200).json({ status: 'success', message: fontColor });
	}

	static async updateFontColor(request: Request, response: Response ): Promise<Response>
	{
		const company = request.userId;
		const { font_color } = request.body;

		const updateFontColorService = new UpdateFontColorService();
		const fontColor = await updateFontColorService.execute({ company, font_color });

		return response.status(200).json({ status: 'success', message: fontColor });
	}

	static async listPassingTree(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const listPassingTree = new ListPassingTreeService();
		const passingTree = await listPassingTree.execute({ company });

		return response.status(200).json({ status: 'success', message: passingTree })
	}

	static async changePassingTree(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const { passing_tree } = request.body;

		const modifyPassingTreeService = new ModifyPassingTreeService();
		const anchorQuestion = await modifyPassingTreeService.execute({ company, passing_tree });

		return response.status(200).json({ status: 'success', message: anchorQuestion });
	}
}

export default ParamsProductController;
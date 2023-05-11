import { Request, Response } from "express";
import CreateAnswerService from "../services/answer/CreateAnswerService";
import EditAnswerService from "../services/answer/EditAnswerService";
import ListAnswersService from "../services/answer/ListAnswersService";
import ListAnswerService from "../services/answer/ListAnswerService";
import RemoveAnswerService from "../services/answer/RemoveAnswerService";

class AnswerController
{
	static async add(request: Request, response: Response)
	{
		const { answer, question } = request.body;

		const createAnswerService = new CreateAnswerService();
		const answerCreated = await createAnswerService.execute({ answer, question });

		response.status(200).json({ status: 'success', message: answerCreated });
	}

	static async edit(request: Request, response: Response)
	{
		const { id, answer } = request.body;

		const editAnswerService = new EditAnswerService();
		const answerEdited = await editAnswerService.execute({ id, answer });

		return response.status(200).json({ status: 'success', message: answerEdited });
	}

	static async list(request: Request, response: Response)
	{
		const { id } = request.body;

		const listAnswerService = new ListAnswerService();
		const answer = await listAnswerService.execute({ id });

		return response.status(200).json({ status: 'success', answer });
	}

	static async listAll(request: Request, response: Response)
	{
		const listAnswersService = new ListAnswersService();
		const answers = await listAnswersService.execute();

		return response.status(200).json({ status: 'success', answers });
	}

	static async remove(request: Request, response: Response)
	{
		const { id } = request.body;

		const removeAnswerService = new RemoveAnswerService();
		const answerRemoved = await removeAnswerService.execute({ id });

		return response.status(200).json({ status: 'success', message: answerRemoved });
	}
}

export default AnswerController;
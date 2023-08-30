import { Request, Response } from "express";
import CreateTopicService from "../services/topic/CreateTopicService";
import EditTopicService from "../services/topic/EditTopicService";
import DeleteTopicService from "../services/topic/DeleteTopicService";
import ListTopicService from "../services/topic/ListTopicService";
import ListTopicsService from "../services/topic/ListTopicsService";
import ChangeStatusTopicService from "../services/topic/ChangeStatusTopicService";
import UpdateIndicateEmployee from "src/services/answer/UpdateIndicateEmployee";

class TopicController
{
	static async add(request: Request, response: Response)
	{
		const company = request.userId;

		const { name, status, indicate_employee } = request.body;

		const createTopicService = new CreateTopicService();
		const newTopic = await createTopicService.execute({ name, status, indicate_employee, company });

		return response.status(200).json({ status: 'success', message: newTopic });
	}

	static async update(request: Request, response: Response)
	{
		const { id, name, status } = request.body;

		const editTopicService = new EditTopicService();
		const editTopic = await editTopicService.execute({ id, name, status });

		return response.status(200).json({ status: 'success', message: editTopic });
	}

	static async changeStatus(request: Request, response: Response)
	{
		const { id, new_status } = request.body;

		const changeStatusTopicService = new ChangeStatusTopicService();
		const changeStatus = await changeStatusTopicService.execute({ id, new_status });

		return response.status(200).json({ status: 'success', message: changeStatus });
	}

	static async delete(request: Request, response: Response)
	{
		const { id } = request.body;

		const deleteTopicService = new DeleteTopicService();
		const deleteTopic = await deleteTopicService.execute({ id });

		return response.status(200).json({ status: 'success', message: deleteTopic });
	}

	static async list(request: Request, response: Response)
	{
		const { id } = request.body;

		const listTopicService = new ListTopicService();
		const listTopic = await listTopicService.execute({ id });

		return response.status(200).json({ status: 'success', listTopic });
	}

	static async listAll(request: Request, response: Response)
	{
		const listTopicsService = new ListTopicsService();
		const listTopics = await listTopicsService.execute();

		return response.status(200).json({ status: 'success', listTopics });
	}

	static async updateIndicateEmployee(request: Request, response: Response): Promise<Response>
	{
		const { id_topic, indicate_employee } = request.body;

		const updateIndicateEmployee = new UpdateIndicateEmployee();
		const updateDataEmployee = await updateIndicateEmployee.execute({ id_topic, indicate_employee });

		return response.status(200).json({ status: 'success', message: updateDataEmployee });
	}
}

export default TopicController;
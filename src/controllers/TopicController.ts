import { Request, Response } from "express";
import CreateTopicService from "../services/topic/CreateTopicService";
import EditTopicService from "../services/topic/EditTopicService";
import DeleteTopicService from "../services/topic/DeleteTopicService";
import ListTopicService from "../services/topic/ListTopicService";
import ListTopicsService from "../services/topic/ListTopicsService";
import ChangeStatusTopicService from "../services/topic/ChangeStatusTopicService";
import UpdateIndicateEmployee from "../services/answer/UpdateIndicateEmployee";
import Topic from '../entities/Topic';

class TopicController
{
	static async add(request: Request, response: Response)
	{
		const company = request.userId;

		const { name, status, indicate_employee } = request.body;

		const createTopicService: CreateTopicService = new CreateTopicService();
		const newTopic = await createTopicService.execute({ name, status, indicate_employee, company });

		return response.status(200).json({ status: 'success', message: newTopic });
	}

	static async update(request: Request, response: Response)
	{
		const { id, name, status } = request.body;

		const editTopicService: EditTopicService = new EditTopicService();
		const editTopic: string = await editTopicService.execute({ id, name, status });

		return response.status(200).json({ status: 'success', message: editTopic });
	}

	static async changeStatus(request: Request, response: Response)
	{
		const { id, new_status } = request.body;

		const changeStatusTopicService: ChangeStatusTopicService = new ChangeStatusTopicService();
		const changeStatus: string = await changeStatusTopicService.execute({ id, new_status });

		return response.status(200).json({ status: 'success', message: changeStatus });
	}

	static async delete(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const deleteTopicService: DeleteTopicService = new DeleteTopicService();
		const deleteTopic: string = await deleteTopicService.execute({ id });

		return response.status(200).json({ status: 'success', message: deleteTopic });
	}

	static async list(request: Request, response: Response): Promise<Response>
	{
		const { id } = request.body;

		const listTopicService: ListTopicService = new ListTopicService();
		const listTopic: Topic | null = await listTopicService.execute({ id });

		return response.status(200).json({ status: 'success', listTopic });
	}

	static async listAll(request: Request, response: Response): Promise<Response>
	{
		const listTopicsService: ListTopicsService = new ListTopicsService();
		const listTopics: Topic[] | null = await listTopicsService.execute();

		return response.status(200).json({ status: 'success', listTopics });
	}

	static async updateIndicateEmployee(request: Request, response: Response): Promise<Response>
	{
		const { id_topic, indicate_employee } = request.body;

		const updateIndicateEmployee: UpdateIndicateEmployee = new UpdateIndicateEmployee();
		const updateDataEmployee: string = await updateIndicateEmployee.execute({ id_topic, indicate_employee });

		return response.status(200).json({ status: 'success', message: updateDataEmployee });
	}
}

export default TopicController;
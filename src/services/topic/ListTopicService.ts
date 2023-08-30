import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Topic from "../../entities/Topic";

type DepartmentRequest = {
	id: string;
}

class ListTopicService
{
	public async execute({ id }: DepartmentRequest): Promise<Topic | null>
	{
		const listTopic = await topicRepository.findOneBy({ id: Number(id) });
		if(!listTopic) {
			throw new BadRequestError('no-topic');
		}

		return listTopic;
	}
}

export default ListTopicService;
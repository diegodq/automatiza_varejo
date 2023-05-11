import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Topic from "../../entities/Topic";

class ListTopicsService
{
	public async execute(): Promise<Topic[] | null>
	{
		const listTopics = await topicRepository.find({ order: { id: 'ASC' } });
		if(listTopics.length == 0) {
			throw new BadRequestError('no-topics');
		}

		return listTopics;
	}
}

export default ListTopicsService;
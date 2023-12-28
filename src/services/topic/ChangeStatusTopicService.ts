import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Topic from '../../entities/Topic';

type TopicRequest =
{
	id: string;
	new_status: string;
}

class ChangeStatusTopicService
{
	public async execute({ id, new_status }: TopicRequest): Promise<string>
	{
		const topicExist: Topic | null = await topicRepository.findOneBy({ id: Number(id) });
		if(!topicExist) {
			throw new BadRequestError('no-topic');
		}

		topicExist.status = Number(new_status);
		await topicRepository.save(topicExist);

		return 'Status atualizado';
	}
}

export default ChangeStatusTopicService;
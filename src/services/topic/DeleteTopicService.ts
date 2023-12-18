import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import Topic from '../../entities/Topic';

type TopicRequest =
{
	id: string;
}

class DeleteTopicService
{
	public async execute({ id }: TopicRequest): Promise<string>
	{
		const topic: Topic | null = await topicRepository.findOneBy({ id: Number(id) });
		if(!topic) {
			throw new BadRequestError('no-department');
		}

		await topicRepository.remove(topic);
		return 'Tópico removido.';
	}
}

export default DeleteTopicService;
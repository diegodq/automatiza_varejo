import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type TopicRequest =
{
	id: string;
}

class DeleteTopicService
{
	public async execute({ id }: TopicRequest)
	{
		const topic = await topicRepository.findOneBy({ id: Number(id) });
		if(!topic) {
			throw new BadRequestError('no-department');
		}

		await topicRepository.remove(topic);
		return 'Tópico removido.';
	}
}

export default DeleteTopicService;
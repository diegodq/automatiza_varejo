import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type TopicRequest =
{
	id: string;
	name: string;
	status: number;
}

class EditTopicService
{
	public async execute({ id, name, status }: TopicRequest)
	{
		const topicExists = await topicRepository.findOneBy({ id: Number(id) });
		if(!topicExists) {
			throw new BadRequestError('no-topic');
		}

		if(topicExists.name === name) {
			throw new BadRequestError('Digite um nome diferente para este tópico.');
		}

		topicExists.name = name;
		topicExists.status = status;
		await topicRepository.save(topicExists);

		return 'Tópico atualizado.';
	}
}

export default EditTopicService;
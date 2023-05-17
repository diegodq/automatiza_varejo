import Company from "src/entities/Company";
import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type TopicRequest =
{
	name: string;
	status: number;
	company: Company
}

class CreateTopicService
{
	public async execute({ name, status, company }: TopicRequest)
	{
		const topicExists = await topicRepository.findOneBy({ name });
		if(topicExists) {
			throw new BadRequestError('Este tópico já está cadastrado.');
		}

		const newTopic = topicRepository.create({ name, status, company });
		await topicRepository.save(newTopic);

		return 'Novo tópico adicionado.';
	}
}

export default CreateTopicService;
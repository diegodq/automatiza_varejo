import Company from "../../entities/Company";
import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type TopicRequest =
{
	name: string;
	status: number;
	company: Company;
}

class CreateTopicService
{
	public async execute({ name, status, company }: TopicRequest): Promise<string | any>
	{
		const topicExists = await topicRepository.findOne({ where: { company: { id: Number(company) } } });
		if(topicExists?.name == name) {
			throw new BadRequestError('Tópico já cadastrado.');
		}

		const newTopic = topicRepository.create({ name, status, company });
		await topicRepository.save(newTopic);

		return 'Tópico adicionado.';
	}
}

export default CreateTopicService;
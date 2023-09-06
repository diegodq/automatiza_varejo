import Company from "../../entities/Company";
import topicRepository from "../../repositories/topicRepository";
import { BadRequestError } from "../../utils/ApiErrors";

type TopicRequest =
{
	name: string;
	status: number;
	indicate_employee: number;
	company: Company;
}

class CreateTopicService
{
	public async execute({ name, status, indicate_employee, company }: TopicRequest): Promise<string | any>
	{
		const topicExists = await topicRepository.findOne({ where: { company: { id: Number(company) } } });
		if(topicExists?.name == name) {
			throw new BadRequestError('Tópico já cadastrado.');
		}

		const newTopic = topicRepository.create({ name, status, indicate_employee, company });
		await topicRepository.save(newTopic);

		return 'topic-added';
	}
}

export default CreateTopicService;
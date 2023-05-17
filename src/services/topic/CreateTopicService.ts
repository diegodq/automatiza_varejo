import topicRepository from "../../repositories/topicRepository";
// import { BadRequestError } from "../../utils/ApiErrors";

type TopicRequest =
{
	name: string;
	status: number;
}

class CreateTopicService
{
	public async execute({ name, status }: TopicRequest)
	{
		// const topicExists = await topicRepository.findOneBy({ name });
		// if(topicExists) {
		// 	throw new BadRequestError('Este tópico já está cadastrado.');
		// }

		const newTopic = topicRepository.create({ name, status });
		await topicRepository.save(newTopic);

		return 'Novo tópico adicionado.';
	}
}

export default CreateTopicService;
import { BadRequestError } from "../../utils/ApiErrors";
import topicRepository from "../../repositories/topicRepository";
import Topic from '../../entities/Topic';

type IndicateEmployee =
{
	indicate_employee: number,
	id_topic: number
}

class UpdateIndicateEmployee
{
	public async execute({ id_topic, indicate_employee }: IndicateEmployee)
	{
		const topicExist: Topic | null = await topicRepository.findOneBy({ id: Number(id_topic) });
		if(!topicExist) {
			throw new BadRequestError('no-topic');
		}

		topicExist.indicate_employee = Number(indicate_employee);
		await topicRepository.save(topicExist);

		return 'indicate-employee-updated';
	}
}

export default UpdateIndicateEmployee;
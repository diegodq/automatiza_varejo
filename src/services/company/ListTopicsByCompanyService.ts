import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import topicRepository from "../../repositories/topicRepository";

type CompanyRequest =
{
	id: number;
}

class ListTopicsByCompanyService
{
	public async execute({ id }: CompanyRequest): Promise<object>
	{

		const companyExists = await companyRepository.findOneBy({ id });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const listTopics = await topicRepository.find({ where: { company: { id } } });
		if(listTopics.length == 0) {
			throw new BadRequestError('no-topics');
		}

		return listTopics;
	}
}

export default ListTopicsByCompanyService;
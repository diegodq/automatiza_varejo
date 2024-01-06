import companyRepository from "../../repositories/companyRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import topicRepository from "../../repositories/topicRepository";
import Company from '../../entities/Company';
import Topic from '../../entities/Topic';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type CompanyRequest =
{
	id: number;
}

class ListTopicsByCompanyService
{
	public async execute({ id }: CompanyRequest): Promise<object>
	{
		const idCompany = await convertUserIdInCompanyId(Number(id));

		const companyExists: Company | null = await companyRepository.findOneBy({ id: idCompany });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const listTopics: Topic[] = await topicRepository.find({ where: { company: { id: idCompany } } });
		if(listTopics.length == 0) {
			throw new BadRequestError('no-topics');
		}

		return listTopics;
	}
}

export default ListTopicsByCompanyService;
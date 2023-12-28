import { BadRequestError } from "../../utils/ApiErrors";
import formatCNPJ from "../../utils/formatCNPJ";
import companyRepository from "../../repositories/companyRepository";
import Company from '../../entities/Company';
import Topic from '../../entities/Topic';

type NPSRequest = {
	cnpj_company: string
}

class ListTopicByCompany
{
	public async execute({ cnpj_company }: NPSRequest): Promise<object>
	{
		const cnpj = formatCNPJ(cnpj_company);
		if(cnpj.length < 14 && cnpj.length > 15) {
			throw new BadRequestError('invalid-cnpj');
		}

		const companyExists: Company | null = await companyRepository.findOneBy({ cnpj });
		if(!companyExists) {
			throw new BadRequestError('no-company');
		}

		const id = companyExists.getId;

		const topicByCompany: Company[] = await companyRepository.find({
			relations: {
				topic: true
			},
			where: { id }
		});

		const topics: Topic[][] = topicByCompany.map(item => {
			return item.topic;
		});

		return { status: 'success', topic: topics }
	}
}

export default ListTopicByCompany;
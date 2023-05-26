import appDataSource from "../../data-source";
import Company from "../../entities/Company";
import { BadRequestError } from "../../utils/ApiErrors";

type CompanyRequest =
{
	id: string;
}

class ListTopicsByCompanyService
{
	public async execute({ id }: CompanyRequest): Promise<Company[] | null>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const listTopics = await queryRunner.manager.query(`select t.id, t.name, t.status from topic as t join company as c on t.company_id = c.id = ${id}`)

		await queryRunner.release();

		if(listTopics.length === 0) {
			throw new BadRequestError('no-topics');
		}

		return listTopics;
	}
}

export default ListTopicsByCompanyService;
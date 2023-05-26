import Company from "../../entities/Company";
import appDataSource from "../../data-source";
import { BadRequestError } from "../../utils/ApiErrors";

type TopicRequest =
{
	id: string;
}

class ListQuestionsByCompanyService
{
	public async execute({ id }: TopicRequest): Promise<Company | null>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const listQuestions = await queryRunner.manager.query(`select q.id, q.title_question, q.question_description, q.tree_question, q.type_question, q.status
		from company c join question q on c.id  = q.company_id = ${id}`);

		await queryRunner.release();
		if(listQuestions.length === 0) {
			throw new BadRequestError('no-question');
		}

		return listQuestions;
	}
}

export default ListQuestionsByCompanyService;
import { QueryRunner } from 'typeorm';
import appDataSource from '../../data-source';

class GetQuestionsGroupMappingService
{
	public async execute(): Promise<object>
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select question_group_mapping.id, question.title_question, question_group.group_name 
		from question_group_mapping join question on question.id = question_group_mapping.question_group_id 
		join question_group on question_group_id = question_group.id;`);

		await queryRunner.release();

		console.log(resultQuery);

		return resultQuery;
	}
}

export default GetQuestionsGroupMappingService;
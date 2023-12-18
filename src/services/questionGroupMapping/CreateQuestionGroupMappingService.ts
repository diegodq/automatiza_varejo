import QuestionGroup from '../../entities/QuestionGroup';
import Question from '../../entities/Question';
import appDataSource from '../../data-source';
import { QueryRunner } from 'typeorm';

type GroupQuestionType = {
	questionGroup: QuestionGroup;
	question: Question;
}

class CreateQuestionGroupMappingService
{
	public async execute({ questionGroup, question }: GroupQuestionType): Promise<string>
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		await queryRunner.query(`insert into question_group_mapping (question_group_id, question_id) values (?, ?);`, [questionGroup, question]);

		await queryRunner.release();

		return 'new-group-name-added';
	}
}

export default CreateQuestionGroupMappingService;
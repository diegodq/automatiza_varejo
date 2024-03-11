import { QueryRunner } from 'typeorm';
import appDataSource from '../../data-source';
import { BadRequestError } from '../../utils/ApiErrors';
import Company from '../../entities/Company';

type TypeRequest = {
	group_id: string;
	company: Company
}

type ResultType = {
	[key: string]: { title_question: string }[];
}

class GetQuestionsGroupMappingService
{
	public async execute({group_id, company}: TypeRequest): Promise<object>
	{
		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select question.title_question, question_group.group_name from question
		join question_group_mapping on question_group_mapping.question_id = question.id
		join question_group on question_group_mapping.question_group_id = question_group.id
		where question_group_mapping.question_group_id = ? and question.company_id = ?;`, [group_id, company]);

		await queryRunner.release();

		if(resultQuery.length == 0)
			throw new BadRequestError('no-group');

		const result: ResultType = {};

		resultQuery.forEach((objeto: { group_name: string; title_question: string; }) => {
			const { group_name, title_question } = objeto;

			if(!result[group_name])
				result[group_name] = [];

			result[group_name].push({title_question});
		});

		return result;
	}
}

export default GetQuestionsGroupMappingService;
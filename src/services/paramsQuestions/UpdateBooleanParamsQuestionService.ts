import Question from "../../entities/Question";
import paramsQuestionRepository from "../../repositories/paramsQuestionRepository";
import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";
import ParamsQuestions from '../../entities/ParamsQuestions';
import { QueryRunner } from 'typeorm';

type ParamsRequest =
{
	question: Question;
	finish_research: number,
	mandatory_question: number,
	position: number,
}

class UpdateBooleanParamsQuestionService
{
	public async execute(params: ParamsRequest[]): Promise<string>
	{
		const param: Question[] = params.map(param => { return param.question });
		const id = Number(param[0]);

		const paramsExists: ParamsQuestions | null = await paramsQuestionRepository.findOne({ where: { question: { id }} });
		if(!paramsExists) {
			throw new BadRequestError('no-params-question');
		}

		const position: number[] = params.map(param => { return param.position });
		if(param.length <= 0) {
			throw new BadRequestError('not-allowed-zero');
		}

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		params.forEach(param => {
			queryRunner.query(`update params_questions set finish_research = ${param.finish_research},
			mandatory_question = ${param.mandatory_question}, position = ${param.position} where question_id = ${param.question}`);
		});

		await queryRunner.release();

		return 'params-updated';
	}
}

export default UpdateBooleanParamsQuestionService;
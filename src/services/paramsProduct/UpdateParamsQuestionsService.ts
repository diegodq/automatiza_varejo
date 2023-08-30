import paramsQuestionRepository from "../../repositories/paramsQuestionRepository";
import Question from "../../entities/Question";
import { BadRequestError } from "../../utils/ApiErrors";
import appDataSource from "../../data-source";

type ParamsRequest =
{
	option_one: string;
	option_two: string;
	input_type: string;
	position: number;
	question: Question;
}

class UpdateParamsQuestionService
{
	public async execute(params: ParamsRequest[]): Promise<string>
	{
		const param = params.map(param => { return param.question });
		const id = Number(param[0]);

		const paramsExists = await paramsQuestionRepository.findOne({ where: { question: { id }} });
		if(!paramsExists) {
			throw new BadRequestError('no-params-question');
		}

		const position = params.map(param => { return param.position })
		if(position.length <= 0) {
			throw new BadRequestError('not-allowed-zero');
		}

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		params.forEach(param => {
			queryRunner.query(`update params_questions set finish_research = ${param.option_one},
			mandatory_question = ${param.option_two}, input_type = ${param.input_type},
			position = ${param.position} where question_id = ${param.question}`);
		});

		await queryRunner.release();

		return 'params-updated';
	}
}

export default UpdateParamsQuestionService;
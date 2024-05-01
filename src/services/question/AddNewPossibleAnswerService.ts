import appDataSource from "../../data-source";

type PossibleAnswer = {
	question_id: string,
	answers: Array<string>
}

class AddNewPossibleAnswerService
{
	public async execute({ question_id, answers }: PossibleAnswer): Promise<string>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		for (let index = 1; index <= answers.length; index++)
		{
			await queryRunner.query(`insert into possible_answers (question_id, answer) values (?, ?)`, [question_id, answers[index - 1]]);
		}

		await queryRunner.release();

		return 'possible-answer-added';
	}
}

export default AddNewPossibleAnswerService;
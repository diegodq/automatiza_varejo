type IDs =
{
	id: number;
}

class CreateQuestionAndAnswersReports
{
	public async execute(id: Array<IDs>): Promise<object>
	{
		return id;
	}
}

export default CreateQuestionAndAnswersReports;
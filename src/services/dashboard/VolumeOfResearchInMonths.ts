import appDataSource from "../../data-source";
import Company from "../../entities/Company";

interface ResearchMonth
{
	company: Company
}

type TypeMonth =
{
	research_name: string
}

interface CountByMonth {
	[key: string]: number;
}

class VolumeOfResearchInMonths
{
	public async execute({ company }: ResearchMonth): Promise<Array<number>>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`SELECT answer.research_name FROM answer join question on answer.question_id = question.id
		where question.company_id = '${company}' and answer.created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
		AND answer.created_at <= NOW();`);

		await queryRunner.release();

		const countByMonth: CountByMonth = {};

		resultQuery.forEach((research_name: TypeMonth) => {
			const resultObject = research_name.research_name;
			if(countByMonth[resultObject])
				countByMonth[resultObject]++;
			else
				countByMonth[resultObject] = 1;
		});

		const chaves = Object.values(countByMonth).slice(0, 6).reverse();

		const array = new Array(6);

		for(let index = 0; index < chaves.length; index++)
		{
			array[index] = chaves[index];
		}

		for (let i = 0; i < array.length; i++) {
			if (array[i] === undefined) {
				array[i] = 0;
			}
		}

		return array
	}
}

export default VolumeOfResearchInMonths;
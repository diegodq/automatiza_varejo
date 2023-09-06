import { Index } from "typeorm";
import appDataSource from "../../data-source";
import Company from "../../entities/Company";

interface ResearchMonth
{
	company: Company,
	month: string;
}

type TypeMonth =
{
	month: string
}

interface CountByMonth {
	[key: string]: number;
}

class VolumeOfResearchInMonths
{
	public async execute({ company, month }: ResearchMonth): Promise<Array<number>>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select date_format(answer.created_at, '%m') as month from answer
		join question on question.id = answer.question_id where company_id = ? order by month desc;`, [ company ]);

		await queryRunner.release();

		const countByMonth: CountByMonth = {};

		resultQuery.forEach((month: TypeMonth) => {
			const resultObject = month.month;
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
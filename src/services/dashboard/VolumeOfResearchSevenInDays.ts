import { BadRequestError } from "src/utils/ApiErrors";
import appDataSource from "../../data-source";

type CompanyType =
{
	company: number;
}

interface TypeDay
{
	day: string
}

interface CountDay
{
	[key: string]: number;
}

class VolumeOfResearchSevenInDays
{
	public async execute({ company }: CompanyType): Promise<object>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select date_format(answer.created_at, '%d') as day from answer
		join question on question.id = answer.question_id where question.company_id = 1 order by day desc;`, [ company ]);

		await queryRunner.release();

		const countByDay: CountDay = {};

		resultQuery.forEach((day: TypeDay) => {
			const resultDay = day.day;
			if(countByDay[resultDay]) {
				countByDay[resultDay]++;
			} else {
				countByDay[resultDay] = 1;
			}
		});

		const result = [];

		if(result.length == 0) {
			throw new BadRequestError('no-researches');
		}

		for(const day in countByDay)
		{
			const count = countByDay[day];
			result.push(count);
		}

		const resultDay = []

		for (let index in result) {
			const indexNumber = Number(index);
			if (indexNumber >= result.length - 14) {
				resultDay.push(result[indexNumber]);
			}
		}

		const halfOne = resultDay.slice(0, resultDay.length / 2);
		const halfTwo = resultDay.slice(resultDay.length / 2);

		const resultHalfOne = [];
		for(let index = halfOne.length - 1; index >= 0; index--)
		{
			resultHalfOne.push(halfOne[index]);
		}

		const resultHalfTwo = [];
		for(let index = halfTwo.length - 1; index >= 0; index--)
		{
			resultHalfTwo.push(halfTwo[index]);
		}

		return {actualDate: resultHalfOne, oldDate: resultHalfTwo };
	}
}

export default VolumeOfResearchSevenInDays;
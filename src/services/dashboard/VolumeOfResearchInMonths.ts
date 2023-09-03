import { BadRequestError } from "src/utils/ApiErrors";
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
	public async execute({ company, month }: ResearchMonth): Promise<Array<number> | string>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select date_format(answer.created_at, '%m') as month from answer
		join question on question.id = answer.question_id where company_id = ? order by month desc;`, [ company ]);

		await queryRunner.release();

		const countByMonth: CountByMonth = {};

		resultQuery.forEach((month: TypeMonth) => {
			const resultMonth = month.month;
			if(countByMonth[resultMonth])
				countByMonth[resultMonth]++;
			else
				countByMonth[resultMonth] = 1;
		});

		const result = [];

		if(result.length == 0) {
			throw new BadRequestError('no-researches');
		}

		for(const month in countByMonth) {
			const count = countByMonth[month];
			result.push(count);
		}

		const resultMonth = []

		for (let index in result) {
			const indexNumber = Number(index);
			if (indexNumber >= result.length - Number(month)) {
				resultMonth.push(result[indexNumber]);
			}
		}

		return resultMonth
	}
}

export default VolumeOfResearchInMonths;
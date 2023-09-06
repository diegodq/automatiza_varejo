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
	public async execute({ company }: CompanyType)
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select date_format(answer.created_at, '%d') as day from answer
		join question on question.id = answer.question_id where question.company_id = ? order by day desc;`, [ company ]);

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

		const chaves = Object.values(countByDay).slice(0, 12).reverse();

		const array = new Array(14);

		for(let index = 0; index < chaves.length; index++)
		{
			array[index] = chaves[index];
		}

		for (let i = 0; i < array.length; i++) {
			if (array[i] === undefined) {
				array[i] = 0;
			}
		}

		const halfOne = array.slice(0, array.length / 2);
		const halTwo = array.slice(array.length / 2);

		return { 'halfOne': halfOne, 'halTwo': halTwo }
	}
}

export default VolumeOfResearchSevenInDays;
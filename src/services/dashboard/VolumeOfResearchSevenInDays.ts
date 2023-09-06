import appDataSource from "../../data-source";

type CompanyType =
{
	company: number;
}

interface TypeResearchName
{
	research_name: string
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

		const resultQuery = await queryRunner.query(`select answer.research_name from answer
		join question on question.id = answer.question_id
		where question.company_id = '${company}' order by answer.created_at desc;`);

		await queryRunner.release();

		const countByDay: CountDay = {};

		resultQuery.forEach((research_name: TypeResearchName) => {
			const resultResearchName = research_name.research_name;
			if(countByDay[resultResearchName]) {
				countByDay[resultResearchName]++;
			} else {
				countByDay[resultResearchName] = 1;
			}
		});

		console.log(countByDay);

		const chaves = Object.values(countByDay).slice(0, 14).reverse();

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
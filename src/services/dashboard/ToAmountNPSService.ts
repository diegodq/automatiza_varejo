import appDataSource from "../../data-source";
import Company from "../../entities/Company";

interface ResearchDate {
	from: string,
	to: string,
	company: Company,
	store: string
}

class ToAmountNPSService
{
	public async execute({ from, to, company, store }: ResearchDate): Promise<Array<number>>
	{
		if(typeof store === 'undefined') {
			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`select answer.research_name, answer.nps_answer from answer
			join question on answer.question_id = question.id
			where date(answer.created_at) between ? and ?
			and question.company_id = ? order by answer.id desc;`, [from, to, company]);

			await queryRunner.release();

			const uniqueResearchNames = [...new Set(resultQuery.map((item: { research_name: any; }) => item.research_name))];
			const detractor: string[] = [];
			const passive: string[] = [];
			const promoter: string[] = [];

			uniqueResearchNames.forEach(researchName => {
				const answers = resultQuery.filter((item: { research_name: unknown; }) => item.research_name === researchName);
				const npsAnswers = answers.map((item: { nps_answer: any; }) => item.nps_answer);

				if (npsAnswers.includes(4)) {
					promoter.push(resultQuery);
				} else if (npsAnswers.includes(3)) {
					passive.push(resultQuery);
				} else if (npsAnswers.every((answer: number) => answer < 3)) {
					detractor.push(resultQuery);
				}
			});

			return [promoter.length, passive.length, detractor.length]
		} else {
			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`select answer.research_name, answer.nps_answer from answer
			join store on store.id = answer.store_id
			where date(answer.created_at) between '2023-08-31' and '2023-08-31'
			and store.company_id = 1 and store.store_number = 2 order by answer.id desc;`, [from, to, company, store]);

			await queryRunner.release();

			const uniqueResearchNames = [...new Set(resultQuery.map((item: { research_name: any; }) => item.research_name))];
			const detractor: string[] = [];
			const passive: string[] = [];
			const promoter: string[] = [];

			uniqueResearchNames.forEach(researchName => {
				const answers = resultQuery.filter((item: { research_name: unknown; }) => item.research_name === researchName);
				const npsAnswers = answers.map((item: { nps_answer: any; }) => item.nps_answer);

				if (npsAnswers.includes(4)) {
					promoter.push(resultQuery);
				} else if (npsAnswers.includes(3)) {
					passive.push(resultQuery);
				} else if (npsAnswers.every((answer: number) => answer < 3)) {
					detractor.push(resultQuery);
				}
			});

			return [promoter.length, passive.length, detractor.length]
		}

	}
}

export default ToAmountNPSService;
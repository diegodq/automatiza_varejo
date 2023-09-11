import appDataSource from "../../data-source";
import Company from "../../entities/Company";

interface ResearchDate {
	from: string,
	to: string,
	company: Company
}

class ToAmountNPSService
{
	public async execute({ from, to, company }: ResearchDate): Promise<Array<number>>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select answer.research_name, answer.nps_answer  from answer
		join question on answer.question_id = question.id
		where date(answer.created_at) between '${from}' and '${to}'
		and question.company_id = '${company}' order by answer.id desc;`);

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

export default ToAmountNPSService;
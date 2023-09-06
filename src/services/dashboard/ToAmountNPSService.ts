import appDataSource from "../../data-source";
import Company from "../../entities/Company";

interface Objeto {
	id: number;
	formatted_date: string;
	research_name: string;
	nps_answer: number;
}

interface Resultado {
	promoter: Objeto[];
	passive: Objeto[];
	detractor: Objeto[];
}

interface ResearchDate {
	from: string,
	to: string,
	company: Company
}

class ToAmountNPSService
{
	public async execute({ from, to, company }: ResearchDate)
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select answer.nps_answer from answer
		join question on answer.question_id = question.id
		where date(answer.created_at) between '${from}' and '${to}'
		and question.company_id = '${company}' order by answer.id desc;`);

		await queryRunner.release();

		const resultado: Resultado = { promoter: [], passive: [], detractor: [] };

		for (const objeto of resultQuery) {
			if (objeto.nps_answer === 4) {
				resultado.promoter.push(objeto);
			} else if (objeto.nps_answer === 3) {
				resultado.passive.push(objeto);
			} else if (objeto.nps_answer < 3) {
				resultado.detractor.push(objeto);
			}
		}

		return { promoter: resultado.promoter.length, passive: resultado.passive.length, detractor: resultado.detractor.length }
	}
}

export default ToAmountNPSService;
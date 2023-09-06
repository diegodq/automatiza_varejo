import Company from "../../entities/Company";

import ListResearchService from "../answer/ListResearchService";

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
		const listResearchService = new ListResearchService();
		const researchService = await listResearchService.execute({ company, from, to });

		const resultado: Resultado = { promoter: [], passive: [], detractor: [] };

		for (const objeto of researchService) {
				if (objeto.nps_answer === 4) {
						resultado.promoter.push(objeto);
				} else if (objeto.nps_answer === 3) {
						resultado.passive.push(objeto);
				} else if (objeto.nps_answer < 3) {
						resultado.detractor.push(objeto);
				}
		}

		console.log(resultado);
	}
}

export default ToAmountNPSService;
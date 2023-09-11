import appDataSource from "../../data-source";

type CompanyType =
{
	company: number;
}

class VolumeOfResearchInMonths
{
	public async execute({ company }: CompanyType)
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`SELECT answer.research_name, date_format(answer.created_at, '%Y-%m-%d') as month
		FROM answer join question on answer.question_id = question.id
		and question.company_id = '${company}' order by answer.created_at desc;`);

		await queryRunner.release();

		const dataAtual = new Date();

		const resultadosFinais = Array.from({ length: 6 }, (_, index) => {
			const dataAlvo = new Date(dataAtual);
			dataAlvo.setMonth(dataAtual.getMonth() - index);

			const mesAlvo = dataAlvo.toISOString().slice(0, 7);

			const researchNamesParaMes = resultQuery
				.filter((item: { month: string; }) => item.month.startsWith(mesAlvo))
				.map((item: { research_name: any; }) => item.research_name);

			const researchNamesUnicos = researchNamesParaMes.filter(
				(value: any, index: any, self: string | any[]) => self.indexOf(value) === index
			);

			return {
				indice: index,
				mes: mesAlvo,
				quantidade: researchNamesUnicos.length,
			};
		});

		const resultArray: number[] = [];
		resultadosFinais.map(value => {
			resultArray.push(value.quantidade);
		});

		console.log(resultadosFinais);
		console.log(resultArray);
		return resultArray.reverse();
	}
}

export default VolumeOfResearchInMonths;
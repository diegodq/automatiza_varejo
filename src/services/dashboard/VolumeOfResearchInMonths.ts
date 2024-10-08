import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";
import appDataSource from "../../data-source";

type CompanyType =
{
	company: number;
	id_store: string
}

class VolumeOfResearchInMonths
{
	public async execute({ company, id_store }: CompanyType): Promise<number[]>
	{
		const idCompany = await convertUserIdInCompanyId(Number(company));

		if(typeof id_store === 'undefined') {
			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`SELECT answer.research_name, date_format(answer.created_at, '%Y-%m-%d') as month
			FROM answer join question on answer.question_id = question.id
			and question.company_id = '${idCompany}' order by answer.created_at desc;`);

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

			return resultArray.reverse();
		} else {
			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`SELECT answer.research_name, date_format(answer.created_at, '%Y-%m-%d') as month, store.store_number
			FROM answer join store on store.id = answer.store_id
			where store.company_id = ? and store.id = ? order by answer.created_at desc;`, [idCompany, id_store]);

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

			return resultArray.reverse();
		}
	}
}

export default VolumeOfResearchInMonths;
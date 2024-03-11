import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";
import appDataSource from "../../data-source";

type CompanyType =
{
	company: number,
	id_store: string
}

class VolumeOfResearchSevenInDays
{
	public async execute({ company, id_store }: CompanyType)
	{
		const idCompany = await convertUserIdInCompanyId(Number(company));

		if(typeof id_store === 'undefined') {
			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`SELECT answer.research_name, date_format(answer.created_at, '%Y-%m-%d') as date
			FROM answer join question on answer.question_id = question.id
			and question.company_id = ? order by answer.created_at desc;`, [idCompany]);

			await queryRunner.release();

			const dataAtual = new Date();

			const resultadosFinais = Array.from({ length: 14 }, (_, index) => {
				const dataAlvo = new Date(dataAtual);
				dataAlvo.setDate(dataAtual.getDate() - index);

				const dataAlvoFormatada = dataAlvo.toISOString().slice(0, 10);


				const researchNamesParaData = resultQuery
					.filter((item: { date: string; }) => item.date === dataAlvoFormatada)
					.map((item: { research_name: any; }) => item.research_name);
				const researchNamesUnicas = [...new Set(researchNamesParaData)];

				return {
					index: index,
					date: dataAlvoFormatada,
					value: researchNamesUnicas.length,
				};
			});

			const resultArray: number[] = [];
			resultadosFinais.map(value => {
				resultArray.push(value.value);
			});

			const half = Math.floor(resultArray.length / 2);
			const halfOne = resultArray.slice(0, half);
			const halfTwo = resultArray.slice(half);

			console.log(resultadosFinais);
			console.log(resultArray);

			return { newDate: halfOne, oldDate: halfTwo }
		} else {
			const queryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`SELECT answer.research_name, date_format(answer.created_at, '%Y-%m-%d') as date, store.store_number
			FROM answer join store on store.id = answer.store_id
			and store.company_id = ? and store.id = ? order by answer.created_at desc;`, [idCompany, id_store]);

			await queryRunner.release();

			const dataAtual = new Date();

			const resultadosFinais = Array.from({ length: 14 }, (_, index) => {
				const dataAlvo = new Date(dataAtual);
				dataAlvo.setDate(dataAtual.getDate() - index);

				const dataAlvoFormatada = dataAlvo.toISOString().slice(0, 10);


				const researchNamesParaData = resultQuery
					.filter((item: { date: string; }) => item.date === dataAlvoFormatada)
					.map((item: { research_name: any; }) => item.research_name);
				const researchNamesUnicas = [...new Set(researchNamesParaData)];

				return {
					index: index,
					date: dataAlvoFormatada,
					value: researchNamesUnicas.length,
				};
			});

			const resultArray: number[] = [];
			resultadosFinais.map(value => {
				resultArray.push(value.value);
			});

			const half = Math.floor(resultArray.length / 2);
			const halfOne = resultArray.slice(0, half);
			const halfTwo = resultArray.slice(half);

			console.log(resultadosFinais);
			console.log(resultArray);

			return { newDate: halfOne, oldDate: halfTwo }
		}
	}
}

export default VolumeOfResearchSevenInDays;
import appDataSource from "../../data-source";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from "../../entities/Company";
import { QueryRunner } from 'typeorm';
import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";

type CompanyId =
{
	company: Company;
	from?: string;
	to?: string;
	store?: string
}

type OptionalQuery =
{
	company: string;
}

interface InputRecord {
	store_number: number;
	id: number;
	formatted_date: string;
	research_name: string;
	device_client: string;
	start_research: Date;
	nps_answer: number;
	client_name: string;
	client_phone: string;
	name_employee: string;
	company_sector: string;
	is_contact: boolean;
}

interface TransformedRecord {
	id: number;
	formatted_date: string;
	device_client: string;
	start_research: Date;
	research_name: string;
	nps_answer: number;
	client_name: string;
	client_phone: string;
	name_employee: string;
	company_sector: string;
	store_number: number;
	is_contact: boolean;
}

interface TransformedData {
	status: string;
	research: TransformedRecord[];
}

class ListResearchService
{
	public async execute({ company, from, to, store }: CompanyId): Promise<object>
	{
		const idCompany = await convertUserIdInCompanyId(Number(company));

		if(typeof store === 'undefined') {
			const queryRunner: QueryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`select answer.id, answer.answer,
			date_format(answer.created_at, '%d/%m/%Y %H:%i:%s') as formatted_date,
			answer.nps_answer, answer.other_answer, answer.research_name, answer.client_name, answer.client_phone,
			answer.id_research, answer.is_contact,
			answer.name_employee, store.store_number from question join answer
			on answer.question_id = question.id
			left join store on store.id = answer.store_id
			where question.company_id = ? and DATE(answer.created_at)
			BETWEEN ? AND ? order by id asc;`, [idCompany, from, to]);

			await queryRunner.release();

			console.log('store undefined ', resultQuery);

			if(resultQuery.length == 0) {
				throw new BadRequestError('no-research');
			}

			return this.transformData(resultQuery);
		} else {
			const queryRunner: QueryRunner = appDataSource.createQueryRunner();
			await queryRunner.connect();

			const resultQuery = await queryRunner.query(`select answer.id, answer.answer, store.store_number, store.company_id,
			date_format(answer.created_at, '%d/%m/%Y %H:%i:%s') as formatted_date,
			answer.nps_answer, answer.other_answer, answer.research_name,
			answer.client_name, answer.client_phone, answer.id_research,
			answer.is_contact, answer.name_employee from answer join store on answer.store_id = store.id
			where store.store_number = ? and store.company_id = ?
			and date(answer.created_at) between ? and ? order by answer.id asc;`, [store, company, from, to]);

			await queryRunner.release();

			console.log(resultQuery);

			if(resultQuery.length == 0) {
				throw new BadRequestError('no-research');
			}

			return this.transformData(resultQuery);
		}
	}

	public async optionalExecute({ company }:OptionalQuery): Promise<object>
	{
		const idCompany = await convertUserIdInCompanyId(Number(company));

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select answer.id, answer.answer, date_format(answer.created_at, '%d/%m/%Y %H:%i:%s') as formatted_date,
		answer.nps_answer, answer.other_answer, answer.research_name, answer.client_name, answer.client_phone, answer.id_research, answer.is_contact,
		answer.name_employee from question join answer on answer.question_id = question.id where question.company_id = ? order by id asc;`, [idCompany]);

		await queryRunner.release();

		console.log(resultQuery);

		if(resultQuery.length == 0) {
			throw new BadRequestError('no-research');
		}

		return this.transformData(resultQuery);
	}

	private transformData(inputData: InputRecord[]): TransformedData {
    const uniqueRecords: Record<string, TransformedRecord> = {};

    inputData.forEach(record => {
      const filterField = record.research_name || record.id.toString();

      if (!uniqueRecords[filterField]) {
        uniqueRecords[filterField] = {
          id: record.id,
					device_client: record.device_client,
					start_research: record.start_research,
          formatted_date: record.formatted_date,
					research_name: record.research_name,
          nps_answer: record.nps_answer,
          client_name: record.client_name,
          client_phone: record.client_phone,
					name_employee: record.name_employee,
					company_sector: record.company_sector,
          is_contact: record.is_contact,
					store_number: record.store_number,
        };
      }
    });

    const transformedResearch: TransformedRecord[] = Object.values(uniqueRecords);

    return {
        status: "success",
        research: transformedResearch
		};
	}
}

export default ListResearchService;
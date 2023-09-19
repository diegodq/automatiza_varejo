import appDataSource from "../../data-source";
import { BadRequestError } from "../../utils/ApiErrors";
import Company from "../../entities/Company";

type CompanyId =
{
	company: Company;
	from?: string;
	to?: string;
}

type OptionalQuery =
{
	company: string;
}

interface InputRecord {
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
	is_contact: boolean;
}

interface TransformedData {
	status: string;
	research: TransformedRecord[];
}


class ListResearchService
{
	public async execute({ company, from, to }: CompanyId): Promise<object>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select answer.id, answer.answer,
		date_format(answer.created_at, '%d/%m/%Y %H:%i:%s') as formatted_date,
		answer.nps_answer, answer.research_title, answer.research_name, answer.client_name, answer.client_phone,
		answer.id_research, answer.is_contact,
		answer.name_employee from question join answer
		on answer.question_id = question.id
		where question.company_id = ${company} and DATE(answer.created_at)
		BETWEEN '${from}' AND '${to}' order by id asc;`);

		await queryRunner.release();

		if(resultQuery.length == 0) {
			throw new BadRequestError('no-research');
		}

		return this.transformData(resultQuery);
	}

	public async optionalExecute({ company }:OptionalQuery): Promise<object>
	{
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const resultQuery = await queryRunner.query(`select answer.id, answer.answer, date_format(answer.created_at, '%d/%m/%Y %H:%i:%s') as formatted_date,
		answer.nps_answer, answer.research_title, answer.research_name, answer.client_name, answer.client_phone, answer.id_research, answer.is_contact,
		answer.name_employee from question join answer on answer.question_id = question.id where question.company_id = ${company} order by id asc;`);

		await queryRunner.release();

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
        };
      }
    });

    const transformedResearch = Object.values(uniqueRecords);

    return {
        status: "success",
        research: transformedResearch
		};
	}
}

export default ListResearchService;
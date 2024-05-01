import convertUserIdInCompanyId from "../../utils/convertUserIdInCompanyId";
import appDataSource from "../../data-source";
import Company from "../../entities/Company";
import { BadRequestError } from "../../utils/ApiErrors";
import { QueryRunner } from 'typeorm';

type RequestParams =
{
	company: Company,
	from: string,
	to: string,
	id_store: string
}

interface OriginalData {
	question_id: number;
	pergunta: string;
	arvore: number;
	answer: string;
	incidencias: string;
}

interface TransformedData {
	question_id: number;
	pergunta: string;
	arvore: number;
	answer: { [key: string]: number };
}

class ListQuestionFlexService
{
	public async execute({company, from, to, id_store}: RequestParams)
	{
		const idCompany = await convertUserIdInCompanyId(Number(company));

		const queryRunner: QueryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		let queryResult = null;
		if(id_store == undefined) {
			queryResult = await queryRunner.query(`select question.id AS question_id, question.question_description AS pergunta,
			question.tree_question AS arvore, answer.answer, COUNT(answer.answer) AS incidencias
			from question LEFT JOIN (SELECT question_id, answer FROM answer
			WHERE DATE(created_at) BETWEEN ? AND ?) AS answer ON question.id = answer.question_id
			where question.type_question = 'flex' and answer.answer <> '' AND question.company_id = ? GROUP by question.id, question.question_description,
			question.tree_question, answer.answer;`, [from, to, idCompany]);
		} else {
			queryResult = await queryRunner.query(`select question.id AS question_id, question.question_description AS pergunta,
			question.tree_question AS arvore, answer.answer, COUNT(answer.answer) AS incidencias
			from question LEFT JOIN (SELECT question_id, answer FROM answer
			WHERE DATE(created_at) BETWEEN ? and ? and answer.store_id = ?) AS answer ON question.id = answer.question_id
			where question.type_question = 'flex' and answer.answer <> '' and question.company_id = 2
			GROUP by question.id, question.question_description, question.tree_question, answer.answer;`, [from, to, id_store, idCompany]);
		}

		await queryRunner.release();

		if(queryResult.length == 0)
			throw new BadRequestError('no-results');

		const resultData: TransformedData[] = await this.transformData(queryResult);
		return resultData;
	}

	private async transformData(originalData: OriginalData[]): Promise<TransformedData[]> {
		const transformedArray: TransformedData[] = [];

    const groupedQuestions = originalData.reduce((acc: { [key: number]: OriginalData[] }, curr) => {
        acc[curr.question_id] = acc[curr.question_id] || [];
        acc[curr.question_id].push(curr);
        return acc;
    }, {});

    for (const questionId in groupedQuestions) {
        if (Object.prototype.hasOwnProperty.call(groupedQuestions, questionId)) {
            const groupedAnswers: { [key: string]: number } = {};
            groupedQuestions[questionId].forEach(answer => {
                groupedAnswers[answer.answer] = parseInt(answer.incidencias);
            });

						transformedArray.push({
	            question_id: parseInt(questionId),
	            pergunta: groupedQuestions[questionId][0].pergunta,
	            arvore: groupedQuestions[questionId][0].arvore,
	            answer: groupedAnswers
            });
        }
    }

    return transformedArray;
	}
}

export default ListQuestionFlexService;
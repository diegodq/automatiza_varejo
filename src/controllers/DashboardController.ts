import { Request, Response } from "express";
import appDataSource from "../data-source";
import VolumeOfResearchInMonths from "../services/dashboard/VolumeOfResearchInMonths";
import VolumeOfResearchSevenInDays from "../services/dashboard/VolumeOfResearchSevenInDays";
import Company from "../entities/Company";
import ToAmountNPSService from "../services/dashboard/ToAmountNPSService";

type CompanyRequest = {
	company: Company
}

interface InputItem {
	research_name: string;
	nps_answer: number | string;
}

interface TransformedItem {
	researchID: string;
	nps_answer: number;
}

interface TransformedArrays {
	positiveResearchs: TransformedItem[];
	negativeResearchs: TransformedItem[];
}

class DashboardController
{
	public static async toAmountTopicInAnswers(request: Request, response: Response)
	{
		const company: CompanyRequest = request.userId;

		const { from, to, type_tree } = request.params;

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const arrayPalavras = await queryRunner.query(`select topic.* from topic where topic.company_id = ?;`, [ company ]);

		const arrayObjetos = await queryRunner.query(`select answer.* from answer join question
		on question.id = answer.question_id and date(answer.created_at)
		between ? and ? and question.tree_question = ? and question.company_id = ?;`, [from, to, type_tree, company]);

		await queryRunner.release();

		const result = arrayPalavras.reduce((acc: any, topic: any) => {
			const words = topic.name.split(',');
			const count = arrayObjetos.filter((obj: any) => obj.answer.split(',').includes(words[0])).length;
			if (count > 0) {
				acc[topic.name] = count;
			}
			return acc;
		}, {})

		response.status(200).json({ topics: result });
	}

	public static async toAmountDepartmentInAnswers(request: Request, response: Response)
	{
		const company: CompanyRequest = request.userId;

		const { from, to, type_tree } = request.params;

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const arrayPalavras = await queryRunner.query(`select department.* from department where department.company_id = ?;`, [ company ]);

		const arrayObjetos = await queryRunner.query(`select answer.* from answer join question
		on question.id = answer.question_id and date(answer.created_at)
		between ? and ? and question.tree_question = ? and question.company_id = ?;`, [from, to, type_tree, company]);

		await queryRunner.release();

		const result = arrayPalavras.reduce((acc: any, department: any) => {
			const words = department.name.split(',');
			const count = arrayObjetos.filter((obj: any) => obj.answer.split(',').includes(words[0])).length;
			if (count > 0) {
				acc[department.name] = count;
			}
			return acc;
			}, {});

		response.status(200).json({ departments: result });
	}

	public static async toAmountEmployeesInAnswers(request: Request, response: Response)
	{
		const company: CompanyRequest = request.userId;

		const { from, to, type_tree } = request.params;

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const data = await queryRunner.query(`select answer.* from answer join question
		on question.id = answer.question_id and date(answer.created_at)
		between ? and ? and question.tree_question = ? and question.company_id = ?;`, [from, to, type_tree, company]);

		await queryRunner.release();

		const result = data.reduce((acc: any, obj: any) => {
			const name = obj.name_employee;
			const researchName = obj.research_name;

			if (name && !acc.processedNames.includes(researchName)) {
					acc.processedNames.push(researchName);
					acc.counts[name] = (acc.counts[name] || 0) + 1;
			}

			return acc;
		}, { counts: {}, processedNames: [] }).counts

		response.status(200).json({ employees: result });
	}

	public static async toAmountResearch(request: Request, response: Response)
	{
		const company: CompanyRequest = request.userId;

		const { from, to } = request.params;

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const passingTree = await queryRunner.query(`select params_product.* from params_product
		where params_product.company_id = ?;`, [ company ]);

		const answers = await queryRunner.query(`select answer.* from answer join question on question.id = answer.question_id
		where date(answer.created_at) between ? and ? and company_id = ?;`, [ from, to, company ]);

		await queryRunner.release();

		function transformArray(inputArray: InputItem[], threshold: number): TransformedArrays {
			const researchMap: { [key: string]: boolean } = {};
			const positiveResearchs: TransformedItem[] = [];
			const negativeResearchs: TransformedItem[] = [];

			inputArray.forEach((item: InputItem) => {
				const nps_answer = parseInt(item.nps_answer as string);
				const transformedItem: TransformedItem = {
					researchID: item.research_name,
					nps_answer: nps_answer,
				};

				if (!researchMap[item.research_name]) {
					researchMap[item.research_name] = true;
					if (nps_answer >= threshold) {
						positiveResearchs.push(transformedItem);
					} else {
						negativeResearchs.push(transformedItem);
					}
				}
			});

			return {
				positiveResearchs,
				negativeResearchs,
			};
		};

		const separatedResearches = transformArray(answers, passingTree[0].passing_tree);

		function transformAndSumNPS(nps_answer: number): number {
			if (nps_answer === 0) return 2;
			if (nps_answer === 1) return 4;
			if (nps_answer === 2) return 6;
			if (nps_answer === 3) return 8;
			if (nps_answer === 4) return 10;
			return 0;
		}

		const totalSum: number = separatedResearches.positiveResearchs.reduce((accumulator, currentValue) => {
			return accumulator + transformAndSumNPS(currentValue.nps_answer);
		}, 0);

		console.log('total positive researches', separatedResearches.positiveResearchs.length);
		console.log('total negative researches', separatedResearches.negativeResearchs.length);
		console.log('total sum', totalSum / (separatedResearches.positiveResearchs.length + separatedResearches.negativeResearchs.length));

		const newResult = [
			separatedResearches.positiveResearchs.length,
			separatedResearches.negativeResearchs.length,
			totalSum / (separatedResearches.positiveResearchs.length + separatedResearches.negativeResearchs.length)
		];

		response.status(200).json({ to: newResult });
	}

	public static async returnVolumeOfResearchInMonths(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const volumeOfResearchInMonths = new VolumeOfResearchInMonths()
		const resultVolume = await volumeOfResearchInMonths.execute({ company });

		return response.status(200).json(resultVolume);
	}

	public static async returnResearchSevenDays(request: Request, response: Response): Promise<Response>
	{
		const company = request.userId;

		const volumeOfResearchSevenDays = new VolumeOfResearchSevenInDays();
		const resultResearch = await volumeOfResearchSevenDays.execute({ company });

		return response.status(200).json(resultResearch);
	}

	public static async toAmountNPS(request: Request, response: Response)
	{
		const company = request.userId;

		const { from, to } = request.params;

		const toAmountNPSService = new ToAmountNPSService();
		const result = await toAmountNPSService.execute({ from, to, company });

		return response.status(200).json(result);
	}
}

export default DashboardController;

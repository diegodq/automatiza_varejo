import { Request, Response } from "express";
import appDataSource from "../data-source";

class DashboardController
{
	public static async toAmountTopicInAnswers(request: Request, response: Response)
	{
		const company = request.userId;

		const { from, to, type_tree } = request.params;

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const data = await queryRunner.query(`select answer.answer, answer.type_answer from answer
		join question on question.id = answer.question_id
		where answer.type_answer = 'TOPIC'
		and date(answer.created_at)
		between ? and ? and question.tree_question = ? and question.company_id = ?;`, [from, to, type_tree, company]);

		await queryRunner.release();

		const resultTopic = data.map((item: { answer: string; }) => {
			return item.answer;
		});

		const topic = Object.create(null);
		for(const index of resultTopic)
		{
			topic[index] = (topic[index] || 0) + 1;
		}

		response.status(200).json({ topics: topic });
	}

	public static async toAmountDepartmentInAnswers(request: Request, response: Response)
	{
		const company = request.userId;

		const { from, to, type_tree } = request.params;

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const data = await queryRunner.query(`select answer.answer, answer.type_answer from answer
		join question on question.id = answer.question_id
		where answer.type_answer = 'DEPARTMENT' and date(answer.created_at)
		between ? and ? and question.tree_question = ? and question.company_id = ?;`, [from, to, type_tree, company]);

		await queryRunner.release();

		const resultDepartment = data.map((item: { answer: string; }) => {
			return item.answer;
		});

		const department = Object.create(null);
		for(const index of resultDepartment)
		{
			department[index] = (department[index] || 0) + 1;
		}

		response.status(200).json({ departments: department });
	}

	public static async toAmountEmployeesInAnswers(request: Request, response: Response)
	{
		const company = request.userId;

		const { from, to, type_tree } = request.params;

		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();

		const data = await queryRunner.query(`select answer.name_employee, answer.type_answer from answer
		join question on question.id = answer.question_id
		where answer.type_answer = 'EMPLOYEE' and date(answer.created_at)
		between ? and ? and question.tree_question = ? and question.company_id = ?`, [from, to, type_tree, company]);

		await queryRunner.release();

		const resultNameEmployee = data.map((item: { name_employee: string; }) => {
			return item.name_employee;
		});

		const employee = Object.create(null);
		for(const index of resultNameEmployee)
		{
			employee[index] = (employee[index] || 0) + 1;
		}

		response.status(200).json({ employees: employee });
	}
}

export default DashboardController;

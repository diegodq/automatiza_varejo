import { Response, Request } from 'express';
import CreateQuestionAndAnswersReports from '../services/reports/CreateQuestionAndAnswersReports';
class ReportsController
{
	static async makePDF(request: Request, response: Response): Promise<Response>
	{
		const createQuestionAndAnswersReports: CreateQuestionAndAnswersReports = new CreateQuestionAndAnswersReports();
		const report: string = await createQuestionAndAnswersReports.execute();

		return response.status(200).json(report);
	}
}

export default ReportsController;
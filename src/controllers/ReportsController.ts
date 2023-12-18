import { Response, Request } from 'express';
import CreateQuestionAndAnswersReports from '../services/reports/CreateQuestionAndAnswersReports';
class ReportsController
{
	static async makePDF(request: Request, response: Response): Promise<Response>
	{
		const IDs = request.body;

		const createQuestionAndAnswersReports: CreateQuestionAndAnswersReports = new CreateQuestionAndAnswersReports();
		const report: object = await createQuestionAndAnswersReports.execute(IDs);

		return response.status(200).json(report);
	}
}

export default ReportsController;
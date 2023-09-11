import { Response, Request } from 'express';
import CreateQuestionAndAnswersReports from '../services/reports/CreateQuestionAndAnswersReports';
class ReportsController
{
	static async makePDF(request: Request, response: Response)
	{
		const IDs = request.body;

		const createQuestionAndAnswersReports = new CreateQuestionAndAnswersReports();
		const report = await createQuestionAndAnswersReports.execute(IDs);

		return response.status(200).json(report);
	}
}

export default ReportsController;
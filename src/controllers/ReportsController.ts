import { Response, Request } from 'express';
import CreateQuestionAndAnswersReports from '../services/reports/CreateQuestionAndAnswersReports';
import { BadRequestError } from '../utils/ApiErrors';
import axios from 'axios';

class ReportsController
{
	static async makePDF(request: Request, response: Response): Promise<Response>
	{
		const data = request.body;

		try {
			const createQuestionAndAnswersReports: CreateQuestionAndAnswersReports = new CreateQuestionAndAnswersReports();
			const pdfPaths: string[] = await createQuestionAndAnswersReports.execute(data);

			return response.status(200).json(pdfPaths);
		} catch(error) {
			console.log('generate pdf error: ', error);
			throw new BadRequestError('an error occurred to generate PDFs.');
		}
	}
}

export default ReportsController;
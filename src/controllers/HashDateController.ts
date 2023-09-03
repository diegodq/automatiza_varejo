import { Request, Response } from 'express';

class HashDateController
{
	static async returnDateToHash(request:Request, response: Response)
	{
		const newDate = new Date();
		return response.status(200).json(newDate);
	}
}

export default HashDateController;
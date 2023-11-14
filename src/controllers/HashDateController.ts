import { Request, Response } from 'express';

class HashDateController
{
	static async returnDateToHash(request:Request, response: Response)
	{
		const currentDate = new Date();
		const offsetInMinutes: number = currentDate.getTimezoneOffset();
		const offsetInMilliseconds: number = offsetInMinutes * 60 * 1000;
		const newDate: Date = new Date(currentDate.getTime() - offsetInMilliseconds)
		
		return response.status(200).json(newDate);
	}
}

export default HashDateController;
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

function validateRequestSchema(request: Request, response: Response, next: NextFunction)
{
	const errors = validationResult(request);
	if(!errors.isEmpty()) {
		return response.status(400).json({ errors: errors.array() });
	}
	return next();
}

export default validateRequestSchema;
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import paramsConfig from "../params/paramsConfig";
import { UnauthorizedError } from "../utils/ApiErrors";

function isAuthenticated(request: Request, response: Response, next: NextFunction)
{
	const authHeader = request.headers.authorization;
	if(!authHeader) {
		throw new UnauthorizedError('Acesso não autorizado.');
	}

	const [, token] = authHeader.split(' ');
	try {
		const decodedToken = verify(token, paramsConfig.jwt.secret);
		const { sub } = decodedToken;
		request.userId = sub;

		return next();
	} catch( _) {
		return response.status(400).json({ valid: false, message: 'Acesso não autorizado.' });
	}
}

export default isAuthenticated;
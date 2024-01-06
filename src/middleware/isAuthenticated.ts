import { JwtPayload, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import paramsConfig from "../params/paramsConfig";
import { UnauthorizedError } from "../utils/ApiErrors";

function isAuthenticated(request: Request, response: Response, next: NextFunction)
{
	const authHeader: string | undefined = request.headers.authorization;
	if(!authHeader) {
		throw new UnauthorizedError('Acesso não autorizado.');
	}

	const [, token] = authHeader.split(' ');
	try {
		const decodedToken: string | JwtPayload = verify(token, paramsConfig.jwt.secret);
		const { sub } = decodedToken;
		const inputSub: string | undefined = sub?.toString();

		request.userId = inputSub?.split(', ')[0];
		request.typeUser = inputSub?.split(', ')[1];

		return next();
	} catch( _ ) {
		return response.status(400).json({ valid: false, message: 'Acesso não autorizado.' });
	}
}

export default isAuthenticated;
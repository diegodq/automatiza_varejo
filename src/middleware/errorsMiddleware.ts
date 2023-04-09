import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../utils/ApiErrors";

const errorMiddleware = (error: Error & ApiErrors, request: Request, response: Response, next: NextFunction) => {
	if (error instanceof ApiErrors) {
		return response.status(error.statusCode).json({
			status: error.status,
			message: error.message
		});
	}

	//return response.status(500).json({ status: 'error', message: 'Erro interno do servidor. Tente mais tarde.'});
	return response.status(500).json(error);
}

export default errorMiddleware;
export class ApiErrors extends Error {
	public readonly statusCode: number;
	public readonly status: string;

	constructor(message: string, statusCode: number, status: string) {
		super(message);
		this.statusCode = statusCode;
		this.status = status;
	}
}

export class BadRequestError extends ApiErrors {
	constructor(message: string) {
		super(message, 400, 'warn');
	}
}

export class UnauthorizedError extends ApiErrors {
	constructor(message: string) {
		super(message, 401, 'warn');
	}
}

export class PermissionError extends ApiErrors {
	constructor(message: string) {
		super(message, 403, 'warn');
	}
}

export class NotFoundError extends ApiErrors {
	constructor(message: string) {
		super(message, 404, 'warn');
	}
}
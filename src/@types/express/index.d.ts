import 'express';

declare module 'express' {
	interface Request {
		userId?: Record<string | undefined>
	}
}
import 'express';

declare module 'express' {
	export interface Request {
		userId?: Record<string | undefined>,
		typeUser?: Record<string | undefined>
	}
}
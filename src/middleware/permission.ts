import { Request, Response, NextFunction } from 'express';
import { UserType } from '../types/user.types';

export function PermissionsMiddleware(permissions: string[]) {
	return async (request: Request, response: Response, next: NextFunction) => {
		const user: UserType = request.body.user;

		const valid = permissions.every((p) => user.permissions.includes(p));

		if (!valid) {
			return response.status(403).json({
				message: 'Access denied.',
			});
		}

		next();
	};
}

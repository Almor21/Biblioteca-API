import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import findUserAction from '../actions/user/find.user.action';
import findByIdUserAction from '../actions/user/findById.user.action';

export async function AuthMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
) {
	if (request.headers.authorization === undefined) {
		return response.status(401).json({
			message: 'Not authorized.',
		});
	}

	const jwtValues = decode(request.headers.authorization);

    const user = await findByIdUserAction(jwtValues as string);

    if (!user) {
        return response.status(401).json({
			message: 'Not authorized.',
		});
    }

	request.body.user = user;

	next();
}

import { Router, Request, Response } from 'express';
import { CreateUserType } from '../types/user.types';
import { createUser } from '../controllers/user.controller';

const userRoutes = Router();

async function CreateUser(
	request: Request<CreateUserType>,
	response: Response
) {
	if (
		['user', 'password', 'permissions'].some(
			(v) => request.body[v] === undefined
		)
	) {
		return response.status(400).json({
			message: 'Missing fields',
        });
	}

	try {
		const user = await createUser(request.body);

		return response.status(200).json({
			message: 'Success.',
			data: user,
		});
	} catch (error) {
		return response.status(500).json({
			message: 'Failure',
		});
	}
}

userRoutes.post('/create', CreateUser);

export default userRoutes;

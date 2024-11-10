import { Router, Request, Response } from 'express';
import { CreateUserType } from '../types/user.types';
import { createUser, loginUser } from '../controllers/user.controller';

import { env } from 'process';
import jwt from 'jsonwebtoken';

const userRoutes = Router();

async function CreateUser(
	request: Request<CreateUserType>,
	response: Response
) {
	if (
		['username', 'password', 'permissions'].some(
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
		console.log(error);
		return response.status(500).json({
			message: 'Failure',
		});
	}
}

async function LoginUser(request: Request, response: Response) {
	if (['username', 'password'].some((v) => request.body[v] === undefined)) {
		return response.status(400).json({
			message: 'Missing fields',
		});
	}

	try {
		const { username, password } = request.body;
		const user = await loginUser(username);

		if (!user || user.password !== password) {
			return response.status(401).json({
				message: 'Incorrect credentials.',
			});
		}

		const token = jwt.sign(
			user.id,
			(env as { JWT_SECRET: string }).JWT_SECRET
		);

		return response.status(200).json({
			message: 'Success.',
			token,
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({
			message: 'Failure',
		});
	}
}

userRoutes.post('/create', CreateUser);
userRoutes.post('/login', LoginUser);

export default userRoutes;

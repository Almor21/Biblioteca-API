import { Router, Request, Response } from 'express';
import { CreateUserType, UpdateUserType, UserType } from '../types/user.types';
import {
	createUser,
	deleteUser,
	loginUser,
	modifyUser,
} from '../controllers/user.controller';

import { env } from 'process';
import jwt from 'jsonwebtoken';
import { PERMISSIONS } from '../constants/permissions.constant';
import { AuthMiddleware } from '../middleware/auth';
import filterFields from '../utils/filterFieldsUtil';

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
		const user = await loginUser(username, password);

		if (!user) {
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
			data: user
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({
			message: 'Failure',
		});
	}
}

async function ModifyUser(request: Request, response: Response) {
	const user: UserType = request.body.user;
	const id = request.params.id;

	if (
		!(
			id === user.id ||
			user.permissions.some((p) => p === PERMISSIONS.MODIFY_USER)
		)
	) {
		return response.status(403).json({
			message: 'Access denied.',
		});
	}

	const data: UpdateUserType = filterFields(request.body, [
		'username',
		'password',
		'permissions',
		'enabled'
	]);

	try {
		const result = await modifyUser(id, data);

		if (!result) {
			return response.status(404).json({
				message: 'User not found.',
			});
		}

		return response.status(200).json({
			message: 'Success.',
			data: result,
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({
			message: 'Failure',
		});
	}
}

async function DeleteUser(request: Request, response: Response) {
	const user: UserType = request.body.user;
	const id = request.params.id;

	if (
		!(
			id === user.id ||
			user.permissions.some((p) => p === PERMISSIONS.DELETE_USER)
		)
	) {
		return response.status(403).json({
			message: 'Access denied.',
		});
	}

	try {
		const result = await deleteUser(id);

		if (!result) {
			return response.status(404).json({
				message: 'User not found.',
			});
		}

		return response.status(200).json({
			message: 'Success.',
			data: result,
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
userRoutes.put('/update/:id', AuthMiddleware, ModifyUser);
userRoutes.delete('/delete/:id', AuthMiddleware, DeleteUser);

export default userRoutes;

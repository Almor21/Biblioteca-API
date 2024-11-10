import { Router, Request, Response } from 'express';
import { CreateBookType } from '../types/book.types';
import { createBook } from '../controllers/book.controller';

import { AuthMiddleware } from '../middleware/auth';
import { PermissionsMiddleware } from '../middleware/permission';

import { PERMISSIONS } from '../constants/permissions.constant';

const bookRoutes = Router();

async function CreateBook(
	request: Request,
	response: Response
) {
	if (request.body.title === undefined) {
		return response.status(400).json({
			message: 'Missing fields',
		});
	}

	try {
		const user = await createBook(request.body);

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

bookRoutes.post(
	'/create',
	AuthMiddleware,
	PermissionsMiddleware([PERMISSIONS.CREATE_BOOK]),
	CreateBook
);

export default bookRoutes;

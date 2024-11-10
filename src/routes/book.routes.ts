import { Router, Request, Response } from 'express';
import { BookType, CreateBookType } from '../types/book.types';
import { createBook, findBooks } from '../controllers/book.controller';

import { AuthMiddleware } from '../middleware/auth';
import { PermissionsMiddleware } from '../middleware/permission';

import { PERMISSIONS } from '../constants/permissions.constant';

const bookRoutes = Router();

async function CreateBook(request: Request, response: Response) {
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

async function FindBook(request: Request, response: Response) {
	const id = request.params.id;
	const filter: Partial<Omit<BookType, 'id' | 'enabled' | 'available'>> =
		request.query;

	try {
		let data: BookType[] = [];

		if (id !== undefined) {
			data = await findBooks({ id });
		} else {
			data = await findBooks(filter);
		}

		if (data?.length === 0) {
			return response.status(200).json({
				message: 'Not found.',
			});
		}
		return response.status(200).json({
			message: 'Success.',
			data,
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
bookRoutes.get('/', FindBook);
bookRoutes.get('/:id', FindBook);

export default bookRoutes;

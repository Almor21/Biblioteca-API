import { Router, Request, Response } from 'express';
import { BookType, CreateBookType, UpdateBookType } from '../types/book.types';
import {
	createBook,
	deleteBook,
	findBooks,
	modifyBook,
} from '../controllers/book.controller';

import { AuthMiddleware } from '../middleware/auth';
import { PermissionsMiddleware } from '../middleware/permission';

import { PERMISSIONS } from '../constants/permissions.constant';
import filterFields from '../utils/filterFieldsUtil';

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
		filterFields(request.query, [
			'title',
			'genre',
			'author',
			'publication_date',
			'publishing_hous',
			'enabled',
		]);

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

async function ModifyBook(request: Request, response: Response) {
	const id = request.params.id;
	const data: UpdateBookType = filterFields(request.body, [
		'title',
		'genre',
		'author',
		'publication_date',
		'publishing_hous',
		'enabled'
	]);

	try {
		const result = await modifyBook(id, data);

		if (!result) {
			return response.status(404).json({
				message: 'Book not found.',
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

async function DeleteBook(request: Request, response: Response) {
	const id = request.params.id;

	try {
		const result = await deleteBook(id);

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

bookRoutes.post(
	'/create',
	AuthMiddleware,
	PermissionsMiddleware([PERMISSIONS.CREATE_BOOK]),
	CreateBook
);
bookRoutes.get('/', FindBook);
bookRoutes.get('/:id', FindBook);
bookRoutes.put(
	'/update/:id',
	AuthMiddleware,
	PermissionsMiddleware([PERMISSIONS.MODIFY_BOOK]),
	ModifyBook
);
bookRoutes.delete(
	'/delete/:id',
	AuthMiddleware,
	PermissionsMiddleware([PERMISSIONS.DELETE_BOOK]),
	DeleteBook
);

export default bookRoutes;

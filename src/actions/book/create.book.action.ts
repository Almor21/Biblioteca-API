import { v4 as uuidv4 } from 'uuid';
import { BookModel } from '../../models/book.model';
import { CreateBookType, BookType } from '../../types/book.types';

async function createBookAction(bookData: CreateBookType): Promise<BookType> {
	const result = await BookModel.create({
		id: uuidv4(),
		...bookData,
	});

	return result;
}

export default createBookAction;

import { BookModel } from '../../models/book.model';
import { BookType } from '../../types/book.types';

async function findBooksAction(bookData: Partial<BookType>): Promise<BookType[]> {
    const result = await BookModel.find(bookData);

	return result;
}

export default findBooksAction;

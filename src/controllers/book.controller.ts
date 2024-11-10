import createBookAction from '../actions/book/create.book.action';
import { BookType, CreateBookType } from '../types/book.types';

async function createBook(bookData: CreateBookType): Promise<BookType> {
    const user = await createBookAction(bookData);

    return user;
}

export { createBook };

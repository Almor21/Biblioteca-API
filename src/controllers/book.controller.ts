import createBookAction from '../actions/book/create.book.action';
import findBooksAction from '../actions/book/find.book.action';
import { BookType, CreateBookType } from '../types/book.types';

async function createBook(bookData: CreateBookType): Promise<BookType> {
    const user = await createBookAction(bookData);

    return user;
}

async function findBooks(bookData: Partial<BookType>): Promise<BookType[]> {
    const user = await findBooksAction(bookData);

    return user;
}

export { createBook, findBooks };

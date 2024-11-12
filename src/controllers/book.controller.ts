import createBookAction from '../actions/book/create.book.action';
import deleteBookAction from '../actions/book/delete.book.action';
import findBooksAction from '../actions/book/find.book.action';
import modifyBookAction from '../actions/book/modify.book.action';
import { BookType, CreateBookType, UpdateBookType } from '../types/book.types';

async function createBook(bookData: CreateBookType): Promise<BookType> {
    const book = await createBookAction(bookData);

    return book;
}

async function findBooks(bookData: Partial<BookType>): Promise<BookType[]> {
    const book = await findBooksAction({enabled: true, ...bookData});

    return book;
}

async function modifyBook(id: string, dataBook: UpdateBookType): Promise<BookType | null> {
	const book = await modifyBookAction(id, dataBook);
	
	return book;
}

async function deleteBook(id: string): Promise<BookType | null> {
	const book = await deleteBookAction(id);
	
	return book;
}

export { createBook, findBooks, modifyBook, deleteBook };

import { BookModelType } from '../models/book.model';

export type BookType = Omit<BookModelType, '_id'>;

export type CreateBookType = {
	title: string;
} & Partial<Omit<BookType, 'id' | 'title'>>;

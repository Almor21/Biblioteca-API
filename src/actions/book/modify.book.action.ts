import { BookModel } from '../../models/book.model';
import { BookType, UpdateBookType } from '../../types/book.types';

async function modifyBookAction(
	id: string,
	bookData: UpdateBookType
): Promise<BookType | null> {
	const book = await BookModel.findOneAndUpdate({ id }, bookData, {
		new: true,
	});

	return book;
}

export default modifyBookAction;

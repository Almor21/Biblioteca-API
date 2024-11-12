import { BookModel } from '../../models/book.model';
import { BookType } from '../../types/book.types';

async function deleteBookAction(id: string): Promise<BookType | null> {
	const result = await BookModel.findOneAndUpdate(
		{ id },
		{ enabled: false },
		{ new: true }
	);

	return result;
}

export default deleteBookAction;

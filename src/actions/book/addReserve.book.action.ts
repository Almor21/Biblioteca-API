import { BookModel } from '../../models/book.model';
import { BookType } from '../../types/book.types';
import { ReserveType } from '../../types/reserve.types';

async function addReservationBookAction(
	reserveData: ReserveType
): Promise<BookType | null> {
	const book = await BookModel.findOne({ id: reserveData.idBook });
	if (!book) return null;

	book.reservations.push({
		id: reserveData.id,
		idUser: reserveData.idUser,
		startDate: reserveData.startDate,
		endDate: reserveData.endDate,
    });

	return book.save();
}

export default addReservationBookAction;

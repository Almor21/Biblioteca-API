import { v4 as uuidv4 } from 'uuid';
import { ReserveType } from '../types/reserve.types';
import addReservationBookAction from '../actions/book/addReserve.book.action';
import addReservationUserAction from '../actions/user/addReserve.user.action';

async function createReserve(
	idUser: string,
	idBook: string,
	startDate: Date,
	endDate: Date
): Promise<ReserveType | null> {
	const reserve: ReserveType = {
		id: uuidv4(),
		idUser,
		idBook,
		startDate,
		endDate,
	};

	const user = await addReservationUserAction(reserve);
	const book = await addReservationBookAction(reserve);

	if (!user || !book) return null;
	return reserve;
}

export { createReserve };

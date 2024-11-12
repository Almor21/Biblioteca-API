import { UserModel } from '../../models/user.model';
import { ReserveType } from '../../types/reserve.types';
import { UserType } from '../../types/user.types';

async function addReservationUserAction(
	reserveData: ReserveType
): Promise<UserType | null> {
	const user = await UserModel.findOne({ id: reserveData.idUser });
	if (!user) return null;

	user.reservations.push({
		id: reserveData.id,
		idBook: reserveData.idUser,
		startDate: reserveData.startDate,
		endDate: reserveData.endDate,
    });

	return user.save();
}

export default addReservationUserAction;

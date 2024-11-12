import { UserModel } from '../../models/user.model';
import { UpdateUserType, UserType } from '../../types/user.types';

async function modifyUserAction(
	id: string,
	userData: UpdateUserType
): Promise<UserType | null> {
	const book = await UserModel.findOneAndUpdate({ id }, userData, {
		new: true,
	});

	return book;
}

export default modifyUserAction;

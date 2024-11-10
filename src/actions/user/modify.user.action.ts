import { v4 as uuidv4 } from 'uuid';
import { UserModel, UserModelType } from '../../models/user.model';
import { UpdateUserType, UserType } from '../../types/user.types';

async function modifyUserAction(
	id: string,
	userData: UpdateUserType
): Promise<UserType | null> {
	const userDocument = await UserModel.findOne({ id });

	if (!userDocument) return null;

	const result = await UserModel.findByIdAndUpdate(
		userDocument._id,
		userData,
		{ new: true }
	);

	return result;
}

export default modifyUserAction;

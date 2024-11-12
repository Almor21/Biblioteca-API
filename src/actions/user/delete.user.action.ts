import { UserModel } from '../../models/user.model';
import { UserType } from '../../types/user.types';

async function deleteUserAction(id: string): Promise<UserType | null> {
	const result = await UserModel.findOneAndUpdate(
		{ id },
		{ enabled: false },
		{ new: true }
	);

	return result;
}

export default deleteUserAction;

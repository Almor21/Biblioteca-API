import { UserModel } from '../../models/user.model';
import { UserType } from '../../types/user.types';

async function findUserAction(username: string): Promise<UserType | null> {
    const result = await UserModel.findOne({ username });

	return result;
}

export default findUserAction;

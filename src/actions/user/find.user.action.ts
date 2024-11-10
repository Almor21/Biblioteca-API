import { UserModel } from '../../models/user.model';
import { UserType } from '../../types/user.types';

async function findUserAction(dataUser: Partial<UserType>): Promise<UserType[]> {
    const result = await UserModel.find(dataUser);

	return result;
}

export default findUserAction;

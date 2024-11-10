import { UserModel } from '../models/user.model';
import { CreateUserType, UserType } from '../types/user.types';

async function createUserAction(userData: CreateUserType): Promise<UserType> {
	const result = await UserModel.create(userData);

	return result;
}

export default createUserAction;

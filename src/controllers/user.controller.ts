import createUserAction from '../actions/user/create.user.action';
import { CreateUserType, UserType } from '../types/user.types';
import findUserAction from '../actions/user/find.user.action';

async function createUser(userData: CreateUserType): Promise<UserType> {
	const user = await createUserAction(userData);

	return user;
}

async function loginUser(username: string): Promise<UserType | null> {
	const user = await findUserAction(username);

	return user;
}

export { createUser, loginUser };

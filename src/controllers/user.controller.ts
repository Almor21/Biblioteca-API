import createUserAction from '../actions/create.user.action';
import { CreateUserType, UserType } from '../types/user.types';

async function createUser(userData: CreateUserType): Promise<UserType> {
    const user = await createUserAction(userData);

    return user;
}

export { createUser };

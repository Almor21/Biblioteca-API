import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../../models/user.model';
import { CreateUserType, UserType } from '../../types/user.types';

async function createUserAction(userData: CreateUserType): Promise<UserType> {
	const result = await UserModel.create({
		id: uuidv4(),
		...userData,
	});

	return result;
}

export default createUserAction;

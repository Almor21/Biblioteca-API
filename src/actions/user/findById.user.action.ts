import { UserModel } from '../../models/user.model';
import { UserType } from '../../types/user.types';

async function findByIdUserAction(id: string): Promise<UserType | null> {
    const result = await UserModel.findOne({ id });

	return result;
}

export default findByIdUserAction;
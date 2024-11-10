import { UserModelType } from "../models/user.model";

export type UserType = Omit<UserModelType, '_id'>

export type CreateUserType = {
    user: string;
    password: string;
    permissions: string[];
}
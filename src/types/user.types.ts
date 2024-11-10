import { UserModelType } from "../models/user.model";

export type UserType = Omit<UserModelType, '_id'>

export type CreateUserType = {
    username: string;
    password: string;
    permissions: string[];
}
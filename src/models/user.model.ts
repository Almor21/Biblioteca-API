import { model, Schema } from 'mongoose';

type UserModelType = {
	_id: string;
	user: string;
	password: string;
	enabled: boolean;
	permissions: string[];
};

const UserSchema = new Schema<UserModelType>(
	{
		user: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		enabled: {
			type: Boolean,
			default: true
		},
		permissions: {
			type: [String],
		},
	},
	{
		versionKey: false,
	}
);

const UserModel = model<UserModelType>('User', UserSchema);

export { UserModel, UserSchema, UserModelType };

import { model, Schema } from 'mongoose';

type UserModelType = {
	_id: string;
	id: string;
	username: string;
	password: string;
	enabled: boolean;
	permissions: string[];
	reservations: {
		id: string;
		idBook: string;
		startDate: Date;
		endDate: Date;
	}[];
};

const UserSchema = new Schema<UserModelType>(
	{
		id: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		enabled: {
			type: Boolean,
			default: true,
		},
		permissions: {
			type: [String],
		},
		reservations: [
			{
				id: String,
				idBook: String,
				startDate: Date,
				endDate: Date,
			},
		],
	},
	{
		versionKey: false,
	}
);

const UserModel = model<UserModelType>('User', UserSchema);

export { UserModel, UserSchema, UserModelType };

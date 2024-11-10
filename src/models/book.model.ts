import { model, Schema } from 'mongoose';

type BookModelType = {
	_id: string;
	id: string;
	title: string;
	genre: string;
	author: string;
	publication_date: string;
	publishing_house: string;
	available: boolean;
	enabled: boolean;
};

const BookSchema = new Schema(
	{
		id: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		genre: {
			type: String,
			default: '',
		},
		author: {
			type: String,
			default: '',
		},
		publication_date: {
			type: Date,
			default: '',
		},
		publishing_house: {
			type: String,
			default: '',
		},
		available: {
			type: Boolean,
			default: true,
		},
		enabled: {
			type: Boolean,
			default: true,
		},
	},
	{
		versionKey: false,
	}
);

const BookModel = model<BookModelType>('Book', BookSchema);

export { BookModel, BookSchema, BookModelType };

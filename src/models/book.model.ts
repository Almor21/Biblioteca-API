import { model, Schema } from 'mongoose';

type BookModelType = {
	_id: string;
	id: string;
	title: string;
	genre: string;
	author: string;
	publication_date: string;
	publishing_house: string;
	availabe: boolean;
	enabled: boolean;
};

const BookSchema = new Schema({
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
	},
	author: {
        type: String,
	},
	publication_date: {
		type: Date,
	},
	publishing_house: {
		type: String,
	},
	available: {
		type: Boolean,
		default: true,
	},
	enabled: {
		type: Boolean,
		default: true,
	},
});

const BookModel = model<BookModelType>('Book', BookSchema);

export { BookModel, BookSchema, BookModelType };

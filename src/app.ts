import userRoutes from './routes/user.routes';
import express from 'express';
import { Request, Response } from 'express';
import bookRoutes from './routes/book.routes';
import reserveRoutes from './routes/reserve.routes';
// import cors from "cors";

// ROUTES
const SERVER_VERSION = '/api/v1/';

// FALLBACKS
function routeNotFound(request: Request, response: Response) {
	response.status(404).json({
		message: 'Route not found.',
	});
}

export default function createApp() {
	// MIDDLEWARES
	const app = express();

	// app.use(cors());
	app.use(express.json());

	app.use(SERVER_VERSION + 'user', userRoutes);
	app.use(SERVER_VERSION + 'book', bookRoutes);
	app.use(SERVER_VERSION + 'reserve', reserveRoutes);

	app.use(routeNotFound);
	return app;
}

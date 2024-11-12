import { Router, Request, Response } from 'express';
import { UserType } from '../types/user.types';
import filterFields from '../utils/filterFieldsUtil';
import { AuthMiddleware } from '../middleware/auth';
import { createReserve } from '../controllers/reserve.controller';

const reserveRoutes = Router();

async function CreateReserve(request: Request, response: Response) {
    const user: UserType = request.body.user;

    if (
		['idBook', 'startDate', 'endDate'].some(
			(v) => request.body[v] === undefined
		)
	) {
		return response.status(400).json({
			message: 'Missing fields',
		});
    }
    
    const { idBook, startDate, endDate } = request.body;
    
    try {
        const reserve = await createReserve(user.id, idBook, startDate, endDate);

        if (!reserve) {
            return response.status(404).json({
                message: 'User or Book not found.',
            });
        }

		return response.status(200).json({
			message: 'Success.',
			data: reserve,
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({
			message: 'Failure',
		});
	}
}

reserveRoutes.post('/', AuthMiddleware, CreateReserve);

export default reserveRoutes;

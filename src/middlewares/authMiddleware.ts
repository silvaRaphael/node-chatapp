import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
	try {
		const { authorization } = request.headers;

		if (!authorization) throw new Error('Authorization header was not provided!');

		const [_, token] = authorization.split(' ');

		if (!token) throw new Error('Authorization token was not provided!');

		const userRepository = new UserRepository();
		const userService = new UserService(userRepository, null);

		const authenticated = await userService.authenticateUser(token);

		if (!authenticated) throw new Error('Unauthorized!');

		const { id } = authenticated;

		(request as any).userId = id;

		next();
	} catch (error: any) {
		response.status(401).json({
			message: error.message,
		});
	}
};

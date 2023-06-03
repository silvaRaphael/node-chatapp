import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { AuthService } from '../services/AuthService';
import { AuthRepository } from '../repositories/AuthRepository';

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
	try {
		const { authorization } = request.headers;

		if (!authorization) throw new Error('Authorization header was not provided!');

		const [_, token] = authorization.split(' ');

		if (!token) throw new Error('Authorization token was not provided!');

		const userRepository = new UserRepository();
		const authRepository = new AuthRepository(userRepository);
		const authService = new AuthService(authRepository);

		const userAuthenticated = await authService.verifyToken(token);

		if (!userAuthenticated) throw new Error('Unauthorized!');

		const { id } = userAuthenticated;

		(request as any).userId = id;

		next();
	} catch (error: any) {
		response.status(401).json({
			message: error.message,
		});
	}
};

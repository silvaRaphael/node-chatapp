import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
	private authService: AuthService;

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	async verifyToken(request: Request, response: Response): Promise<Response> {
		try {
			const { authorization } = request.headers;

			if (!authorization) throw new Error('Authorization header was not provided!');

			const [_, token] = authorization.split(' ');

			if (!token) throw new Error('Authorization token was not provided!');

			const userAuthenticated = await this.authService.verifyToken(token);

			if (!userAuthenticated) throw new Error('Unauthorized!');

			return response.status(200).json(userAuthenticated);
		} catch (error: any) {
			return response.status(401).json({
				message: error.message,
			});
		}
	}

	async signIn(request: Request, response: Response): Promise<Response> {
		try {
			const { email, password } = request.body;

			const user = await this.authService.signIn({
				email,
				password,
			});

			(user as any).password = undefined;

			return response.status(200).json(user);
		} catch (error: any) {
			return response.status(401).json({
				message: error.message,
			});
		}
	}

	async signOut(request: Request, response: Response): Promise<Response> {
		try {
			const { userId } = request as any;

			const user = await this.authService.signOut(userId);

			return response.status(200).end();
		} catch (error: any) {
			return response.status(401).json({
				message: error.message,
			});
		}
	}
}

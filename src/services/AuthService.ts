import { User } from '../entities/User';
import { AuthRepository } from '../repositories/AuthRepository';

export interface SignInRequest {
	email: string;
	password: string;
}

export class AuthService {
	private authRepository: AuthRepository;

	constructor(authRepository: AuthRepository) {
		this.authRepository = authRepository;
	}

	async verifyToken(token: string): Promise<User | null> {
		const user = await this.authRepository.verifyToken(token);

		if (!user) return null;

		(user as any).password = undefined;
		(user as any).token = undefined;

		return user;
	}

	async signIn({ email, password }: SignInRequest): Promise<User> {
		if (!email || !password) throw new Error('Missing data!');

		try {
			const userAuthenticated = await this.authRepository.signIn({
				email,
				password,
			});

			(userAuthenticated as any).password = undefined;

			return userAuthenticated;
		} catch (error: any) {
			throw error;
		}
	}

	async signOut(id: string): Promise<void> {
		try {
			await this.authRepository.signOut(id);
		} catch (error: any) {
			throw error;
		}
	}
}

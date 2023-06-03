import { User } from '../entities/User';
import { SignInRequest } from '../services/AuthService';
import { UserRepository } from './UserRepository';

export interface IAuthRepository {
	verifyToken(token: string): Promise<User | null>;
	signIn({ email, password }: SignInRequest): Promise<User>;
	signOut(id: string): Promise<void>;
}

export class AuthRepository implements IAuthRepository {
	private userRepository: UserRepository;
	private users: User[];

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
		this.users = userRepository.users;
	}

	async verifyToken(token: string): Promise<User | null> {
		const user = this.users.find((item) => item.token === token);

		if (!user) return null;

		return user;
	}

	async signIn({ email, password }: SignInRequest): Promise<User> {
		const emailExists = this.users.find((item) => item.email === email);

		if (!emailExists) throw new Error('User does not exist!');

		const user = this.users.find((item) => item.email === email && item.password === password);

		if (!user) throw new Error('Wrong password!');

		user.token = 'meu-token';

		this.userRepository.save(user);

		return user;
	}

	async signOut(id: string): Promise<void> {
		const user = this.users.find((item) => item.id === id);

		if (user) {
			user.token = '';

			this.userRepository.save(user);
		}
	}
}

import { randomBytes } from 'node:crypto';
import { User } from '../entities/User';
import { SignInRequest } from '../services/AuthService';
import { UserRepository } from './UserRepository';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/UserModel';

export interface IAuthRepository {
	verifyToken(token: string): Promise<User | null>;
	signIn({ email, password }: SignInRequest): Promise<User>;
	signOut(id: string): Promise<void>;
}

export class AuthRepository implements IAuthRepository {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async verifyToken(token: string): Promise<User | null> {
		const user = await UserModel.findOne({ token }).exec();

		if (!user) return null;

		return {
			id: user._id.toString(),
			...user.toObject(),
		};
	}

	async signIn({ email, password }: SignInRequest): Promise<User> {
		const user = await UserModel.findOne({ email }).exec();

		if (!user) throw new Error('User does not exist!');

		const passwordMatches = await bcrypt.compare(password, user.password);

		if (!passwordMatches) throw new Error('Wrong password!');

		user.token = randomBytes(12).toString('hex');

		this.userRepository.save(user.toObject());

		return {
			id: user._id.toString(),
			...user.toObject(),
		};
	}

	async signOut(id: string): Promise<void> {
		const user = await UserModel.findById(id).exec();

		if (user) {
			user.token = '';

			this.userRepository.save(user.toObject());
		}
	}
}

import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { Transporter } from 'nodemailer';
import { newUserEmailTemplate } from '../utils/emailTemplates';
import bcrypt from 'bcryptjs';

interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
}

interface UpdateUserRequest {
	id: string;
	name: string;
	email: string;
	password: string;
}

export class UserService {
	private userRepository: UserRepository;
	private transporter: Transporter | null;

	constructor(userRepository: UserRepository, transporter: Transporter | null) {
		this.userRepository = userRepository;
		this.transporter = transporter;
	}

	async createUser({ name, email, password }: CreateUserRequest): Promise<User> {
		if (!name || !email || !password) throw new Error('Missing data!');

		const passwordHash = await bcrypt.hash(password, 10);

		const user = new User({
			name,
			email,
			password: passwordHash,
		});

		try {
			const createdUser = await this.userRepository.create(user);

			(createdUser as any).password = undefined;

			if (this.transporter) {
				this.transporter.sendMail({
					from: 'miles.barrows@ethereal.email',
					to: user.email,
					subject: 'User created! 🎉',
					html: newUserEmailTemplate(user),
				});
			}

			return createdUser;
		} catch (error: any) {
			throw error;
		}
	}

	async getUser(id: string): Promise<User | null> {
		const user = await this.userRepository.findById(id);

		if (!user) return null;

		(user as any).password = undefined;
		(user as any).token = undefined;

		return user;
	}

	async updateUser({ id, name, email, password }: UpdateUserRequest): Promise<User> {
		if (!id) throw new Error('ID was not informed!');

		if (!name || !email || !password) throw new Error('Missing data!');

		try {
			const user = await this.userRepository.findById(id);

			if (!user) throw new Error('User does not exist!');

			const passwordHash = await bcrypt.hash(password, 10);

			user.name = name;
			user.email = email;
			user.password = passwordHash;

			await this.userRepository.save(user);

			(user as any).password = undefined;
			(user as any).token = undefined;

			return user;
		} catch (error: any) {
			throw error;
		}
	}
}

import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { Transporter } from 'nodemailer';
import { newUserEmailTemplate } from '../utils/emailTemplates';

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

		const user = new User({
			name,
			email,
			password,
		});

		try {
			const createdUser = await this.userRepository.create(user);

			this.transporter!.sendMail({
				from: 'miles.barrows@ethereal.email',
				to: user.email,
				subject: 'User created! 🎉',
				html: newUserEmailTemplate(user),
			});

			return createdUser;
		} catch (error: any) {
			throw error;
		}
	}

	async getUser(id: string): Promise<User | null> {
		const user = await this.userRepository.findById(id);

		return user;
	}

	async updateUser({ id, name, email, password }: UpdateUserRequest): Promise<User> {
		if (!id) throw new Error('ID was not informed!');

		if (!name || !email || !password) throw new Error('Missing data!');

		try {
			const existingUser = await this.userRepository.findById(id);

			if (!existingUser) throw new Error('User does not exist!');

			existingUser.name = name;
			existingUser.email = email;
			existingUser.password = password;

			const userUpdated = await this.userRepository.save(existingUser);

			return userUpdated;
		} catch (error: any) {
			throw error;
		}
	}
}

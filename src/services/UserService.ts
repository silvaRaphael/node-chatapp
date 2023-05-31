import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

interface CreateUserRequest {
	name: String;
	email: String;
	password: String;
}

interface UpdateUserRequest {
	id: String;
	name: String;
	email: String;
	password: String;
}

export class UserService {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async authenticateUser(token: String): Promise<User | null> {
		const user = await this.userRepository.authenticate(token);

		return user;
	}

	async createUser({
		name,
		email,
		password,
	}: CreateUserRequest): Promise<User> {
		if (!name || !email || !password) throw new Error('Missing data!');

		const user = new User({
			name,
			email,
			password,
		});

		const createdUser = await this.userRepository.create(user);

		return createdUser;
	}

	async getUser(id: String): Promise<User | null> {
		const user = await this.userRepository.findById(id);

		return user;
	}

	async updateUser({
		id,
		name,
		email,
		password,
	}: UpdateUserRequest): Promise<User> {
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

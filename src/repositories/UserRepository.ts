import { User } from '../entities/User';

export interface UserRepository {
	authenticate(token: String): Promise<User | null>;
	create(user: User): Promise<User>;
	findById(id: String): Promise<User | null>;
	save(user: User): Promise<User>;
}

export class UserRepository implements UserRepository {
	users: User[] = [];

	async authenticate(token: String): Promise<User | null> {
		const user = this.users.find((item) => item.token === token);

		if (!user) return null;

		return user;
	}

	async create(user: User): Promise<User> {
		const userExists = this.users.find((item) => item.email === user.email);

		if (userExists) throw new Error('Email already in use!');

		this.users.push(user);

		return user;
	}

	async findById(id: String): Promise<User | null> {
		const user = this.users.find((item) => item.id === id);

		if (!user) return null;

		return user;
	}

	async save(user: User): Promise<User> {
		const userMatch = this.users.find((item) => item.id === user.id);

		if (!userMatch) throw new Error('User does not exist!');

		userMatch.name = user.name;
		userMatch.email = user.email;
		userMatch.password = user.password;

		return userMatch;
	}
}

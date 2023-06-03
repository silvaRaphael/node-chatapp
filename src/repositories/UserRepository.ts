import { User } from '../entities/User';

export interface UserRepository {
	create(user: User): Promise<User>;
	findById(id: string): Promise<User | null>;
	save(user: User): Promise<User>;
}

export class UserRepository implements UserRepository {
	users: User[] = [];

	async create(user: User): Promise<User> {
		const userExists = this.users.find((item) => item.email === user.email);

		if (userExists) throw new Error('Email already in use!');

		this.users.push(user);

		return user;
	}

	async findById(id: string): Promise<User | null> {
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
		userMatch.updatedAt = new Date();

		return userMatch;
	}
}

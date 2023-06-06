import { isValidObjectId } from 'mongoose';
import { User } from '../entities/User';
import { UserModel } from '../models/UserModel';

export interface IUserRepository {
	create(user: User): Promise<User>;
	findById(id: string): Promise<User | null>;
	save(user: User): Promise<void>;
}

export class UserRepository implements IUserRepository {
	async create(user: User): Promise<User> {
		const userExists = await UserModel.findOne({ email: user.email }).exec();

		if (userExists) throw new Error('Email already in use!');

		const userCreated = await UserModel.create({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: user.token,
			password: user.password,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});

		return {
			id: userCreated._id.toString(),
			...userCreated.toObject(),
		};
	}

	async findById(id: string): Promise<User | null> {
		if (!isValidObjectId(id)) return null;

		const user = await UserModel.findById(id).exec();

		if (!user) return null;

		return {
			id: user._id.toString(),
			...user.toObject(),
		};
	}

	async save(user: User): Promise<void> {
		const userMatch = await UserModel.findById(user.id).exec();

		if (!userMatch) throw new Error('User does not exist!');

		userMatch.name = user.name;
		userMatch.email = user.email;
		userMatch.password = user.password;
		userMatch.updatedAt = new Date();

		await userMatch.save();
	}
}

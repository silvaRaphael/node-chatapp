import { isValidObjectId } from 'mongoose';
import { Chat } from '../entities/Chat';
import { ChatModel } from '../models/ChatModel';

export interface FindByChatAndUser {
	chat: string;
	user: string;
}

export interface IChatRepository {
	create(chat: Chat): Promise<Chat>;
	findByChatIdAndUserId({ chat, user }: FindByChatAndUser): Promise<Chat | null>;
	findByUserId(id: string): Promise<Chat[]>;
	save(chat: Chat): Promise<void>;
}

export class ChatRepository implements IChatRepository {
	async create(chat: Chat): Promise<Chat> {
		const [userId, user] = chat.users;

		const chatExists = await ChatModel.findOne({
			users: { $all: [userId, user] },
		})
			.lean()
			.exec();

		if (chatExists) throw new Error('Chat already exists!');

		const chatCreated = await ChatModel.create({
			_id: chat.id,
			users: chat.users,
			createdAt: chat.createdAt,
			updatedAt: chat.updatedAt,
		});

		return {
			id: chatCreated._id.toString(),
			...chatCreated.toObject(),
		};
	}

	async findByChatIdAndUserId({ chat, user }: FindByChatAndUser): Promise<Chat | null> {
		if (!isValidObjectId(chat)) return null;

		const chatExists = await ChatModel.findOne({ _id: chat, users: { $in: [user] } })
			.populate('users', 'name')
			.exec();

		if (!chatExists) return null;

		return {
			id: chatExists._id.toString(),
			...chatExists.toObject(),
		};
	}

	async findByUserId(id: string): Promise<Chat[]> {
		if (!isValidObjectId(id)) return [];

		const chats = await ChatModel.find({ users: { $in: [id] } })
			.populate('users', 'name')
			.lean()
			.exec();

		if (!chats) return [];

		return chats.map((chat: any) => {
			return {
				id: chat._id.toString(),
				...chat,
			};
		});
	}

	async save(chat: Chat): Promise<void> {
		const chatMatch = await ChatModel.findOne({ _id: chat }).exec();

		if (!chatMatch) throw new Error('Chat does not exist!');

		const [firstUser, secondUser] = chatMatch.users;

		chatMatch.users = [firstUser, secondUser];

		await chatMatch.save();
	}
}

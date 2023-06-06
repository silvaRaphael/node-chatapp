import { Message } from '../entities/Message';
import { MessageModel } from '../models/MessageModels';

export interface IMessageRepository {
	create(message: Message): Promise<Message>;
	findByChatId(chat: string): Promise<Message[]>;
}

export class MessageRepository implements IMessageRepository {
	async create(message: Message): Promise<Message> {
		const messageCreated = await MessageModel.create({
			chat: message.chat,
			user: message.user,
			content: message.content,
			createdAt: message.createdAt,
			updatedAt: message.updatedAt,
		});

		return {
			id: messageCreated._id.toString(),
			...messageCreated.toObject(),
		};
	}

	async findByChatId(chat: string): Promise<Message[]> {
		const messages = await MessageModel.find({ chat }).populate('user', 'name').lean().exec();

		if (!messages) return [];

		return messages.map((message: any) => {
			return {
				id: message._id.toString(),
				...message,
			};
		});
	}
}

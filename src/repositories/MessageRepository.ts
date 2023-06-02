import { Message } from '../entities/Message';

export interface IMessageRepository {
	create(message: Message): Promise<Message>;
	findByChatId(chat: string): Promise<Message[]>;
}

export class MessageRepository implements IMessageRepository {
	messages: Message[] = [];

	async create(message: Message): Promise<Message> {
		this.messages.push(message);

		return message;
	}

	async findByChatId(chat: string): Promise<Message[]> {
		const messages = this.messages.filter((item) => item.chat === chat);

		return messages;
	}
}

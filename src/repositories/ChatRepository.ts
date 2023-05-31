import { Chat } from '../entities/Chat';

export interface IChatRepository {
	create(chat: Chat): Promise<Chat>;
	findById(id: String): Promise<Chat | null>;
	findByUserId(id: String): Promise<Chat[]>;
	save(chat: Chat): Promise<Chat>;
}

export class ChatRepository implements IChatRepository {
	chats: Chat[] = [];

	async create(chat: Chat): Promise<Chat> {
		const chatExists = this.chats.find(
			(item) =>
				item.users.includes(chat.users[0]) &&
				item.users.includes(chat.users[1]),
		);

		if (chatExists) throw new Error('Chat already exists!');

		this.chats.push(chat);

		return chat;
	}

	async findById(id: String): Promise<Chat | null> {
		const chat = this.chats.find((item) => item.id === id);

		if (!chat) return null;

		return chat;
	}

	async findByUserId(id: String): Promise<Chat[]> {
		const chats = this.chats.filter((item) => item.users.includes(id));

		return chats;
	}

	async save(chat: Chat): Promise<Chat> {
		const chatMatch = this.chats.find((item) => item.id === chat.id);

		if (!chatMatch) throw new Error('Chat does not exist!');

		chatMatch.users = chat.users;

		return chatMatch;
	}
}

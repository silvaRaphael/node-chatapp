import { Chat } from '../entities/Chat';

export interface FindByChatAndUser {
	chat: string;
	user: string;
}

export interface IChatRepository {
	create(chat: Chat): Promise<Chat>;
	findByChatIdAndUserId({ chat, user }: FindByChatAndUser): Promise<Chat | null>;
	findByUserId(id: string): Promise<Chat[]>;
	save(chat: Chat): Promise<Chat>;
}

export class ChatRepository implements IChatRepository {
	chats: Chat[] = [];

	async create(chat: Chat): Promise<Chat> {
		const chatExists = this.chats.find(
			(item) => item.users.includes(chat.users[0]) && item.users.includes(chat.users[1]),
		);

		if (chatExists) throw new Error('Chat already exists!');

		this.chats.push(chat);

		return chat;
	}

	async findByChatIdAndUserId({ chat, user }: FindByChatAndUser): Promise<Chat | null> {
		const chatMatch = this.chats.find((item) => item.id === chat && item.users.includes(user));

		if (!chatMatch) return null;

		return chatMatch;
	}

	async findByUserId(id: string): Promise<Chat[]> {
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

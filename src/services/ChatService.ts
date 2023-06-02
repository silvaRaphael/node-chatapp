import { Chat } from '../entities/Chat';
import { ChatRepository, FindByChatAndUser } from '../repositories/ChatRepository';

interface CreateChatRequest {
	userId: string;
	users: string[];
}

export class ChatService {
	private chatRepository: ChatRepository;

	constructor(chatRepository: ChatRepository) {
		this.chatRepository = chatRepository;
	}

	async createChat({ userId, users }: CreateChatRequest): Promise<Chat> {
		if (!users || users.length != 2) throw new Error('Missing data!');

		if (!users.includes(userId)) throw new Error('Unauthorized!');

		const chat = new Chat({ users });

		const chatCreated = await this.chatRepository.create(chat);

		return chatCreated;
	}

	async getChatById({ chat, user }: FindByChatAndUser): Promise<Chat | null> {
		const chatMatch = await this.chatRepository.findByChatIdAndUserId({
			chat,
			user,
		});

		if (!chatMatch) return null;

		return chatMatch;
	}

	async getChatsByUserId(id: string): Promise<Chat[]> {
		const chats = await this.chatRepository.findByUserId(id);

		return chats;
	}

	async updateChat({ chat, user }: FindByChatAndUser): Promise<Chat> {
		if (!chat) throw new Error('ID was not informed!');

		try {
			const existingChat = await this.chatRepository.findByChatIdAndUserId({
				chat,
				user,
			});

			if (!existingChat) throw new Error('Chat does not exist!');

			existingChat.updatedAt = new Date();

			const updateChat = await this.chatRepository.save(existingChat);

			return updateChat;
		} catch (error: any) {
			throw error;
		}
	}
}

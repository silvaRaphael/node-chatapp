import { Chat } from '../entities/Chat';
import { ChatRepository } from '../repositories/ChatRepository';

interface CreateChatRequest {
	users: String[];
}

export class ChatService {
	private chatRepository: ChatRepository;

	constructor(chatRepository: ChatRepository) {
		this.chatRepository = chatRepository;
	}

	async createChat({ users }: CreateChatRequest): Promise<Chat> {
		if (!users || users.length != 2) throw new Error('Missing data!');

		const chat = new Chat({ users });

		const chatCreated = await this.chatRepository.create(chat);

		return chatCreated;
	}

	async getChatsById(id: String): Promise<Chat | null> {
		const chat = await this.chatRepository.findById(id);

		if (!chat) return null;

		return chat;
	}

	async getChatsByUserId(id: String): Promise<Chat[]> {
		const chats = await this.chatRepository.findByUserId(id);

		return chats;
	}

	async updateChat(id: String): Promise<Chat> {
		if (!id) throw new Error('ID was not informed!');

		try {
			const existingChat = await this.chatRepository.findById(id);

			if (!existingChat) throw new Error('Chat does not exist!');

			existingChat.updatedAt = new Date();

			const updateChat = await this.chatRepository.save(existingChat);

			return updateChat;
		} catch (error: any) {
			throw error;
		}
	}
}

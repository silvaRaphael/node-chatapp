import { Chat } from '../entities/Chat';
import { ChatRepository, FindByChatAndUser } from '../repositories/ChatRepository';

interface CreateChatRequest {
	users: string[];
}

export class ChatService {
	private chatRepository: ChatRepository;

	constructor(chatRepository: ChatRepository) {
		this.chatRepository = chatRepository;
	}

	async createChat({ users }: CreateChatRequest): Promise<Chat> {
		if (!users || users.length != 2) throw new Error('Missing data!');

		const chat = new Chat({ users });

		try {
			const chatCreated = await this.chatRepository.create(chat);

			return chatCreated;
		} catch (error: any) {
			throw error;
		}
	}

	async getChatById({ chat, user }: FindByChatAndUser): Promise<Chat | null> {
		if (!chat) throw new Error('ID was not informed!');

		const chatMatch = await this.chatRepository.findByChatIdAndUserId({
			chat,
			user,
		});

		if (!chatMatch) return null;

		return chatMatch;
	}

	async getChatsByUserId(id: string): Promise<Chat[]> {
		if (!id) throw new Error('ID was not informed!');

		const chats = await this.chatRepository.findByUserId(id);

		return chats;
	}
}

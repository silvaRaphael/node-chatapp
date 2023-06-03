import { Message } from '../entities/Message';
import { ChatRepository, FindByChatAndUser } from '../repositories/ChatRepository';
import { MessageRepository } from '../repositories/MessageRepository';

interface CreateMessageRequest {
	chat: string;
	user: string;
	content: string;
}

export class MessageService {
	private chatRepository: ChatRepository;
	private messageRepository: MessageRepository;

	constructor(messageRepository: MessageRepository, chatRepository: ChatRepository) {
		this.messageRepository = messageRepository;
		this.chatRepository = chatRepository;
	}

	async createMessage({ chat, user, content }: CreateMessageRequest): Promise<Message> {
		if (!chat || !user || !content.length) throw new Error('Missing data!');

		const chatExists = await this.chatRepository.findByChatIdAndUserId({
			chat,
			user,
		});

		if (!chatExists) throw new Error('Chat does not exist!');

		const message = new Message({
			chat,
			user,
			content,
		});

		const messageCreated = await this.messageRepository.create(message);

		return messageCreated;
	}

	async getMessagesByChatIdAndUserId({ chat, user }: FindByChatAndUser): Promise<Message[]> {
		if (!chat) throw new Error('ID was not informed!');

		const chatExists = await this.chatRepository.findByChatIdAndUserId({
			chat,
			user,
		});

		if (!chatExists) throw new Error('Chat does not exist!');

		const messages = await this.messageRepository.findByChatId(chat);

		return messages;
	}
}

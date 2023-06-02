import { Message } from '../entities/Message';
import { ChatRepository } from '../repositories/ChatRepository';
import { MessageRepository } from '../repositories/MessageRepository';
import { ChatService } from '../services/ChatService';
import { MessageService } from '../services/MessageService';

describe('Message Service test', () => {
	let messageRepository: MessageRepository;
	let chatRepository: ChatRepository;
	let messageService: MessageService;
	let chatService: ChatService;

	beforeAll(() => {
		messageRepository = new MessageRepository();
		chatRepository = new ChatRepository();
		messageService = new MessageService(messageRepository, chatRepository);
		chatService = new ChatService(chatRepository);
	});

	it('should be able to create an message', async () => {
		const chatCreated = await chatService.createChat({
			userId: 'meu-id',
			users: ['meu-id', 'outro-id'],
		});

		const messageCreated = await messageService.createMessage({
			chat: 'meu-id',
			user: 'meu-id',
			content: 'This is my first message',
		});

		expect(messageCreated).toBeInstanceOf(Message);
		expect(messageCreated).toHaveProperty('id');
		expect(messageCreated).toHaveProperty('createdAt');
	});

	it('should not be able to create an message in a chat that is not mine', async () => {
		await expect(async () => {
			const chatCreated = await chatService.createChat({
				userId: 'meu-id',
				users: ['meu-id', 'outro-id-2'],
			});

			const messageCreated = await messageService.createMessage({
				chat: 'meu-id',
				user: 'non-chat-user',
				content: 'This is my first message',
			});
		}).rejects.toThrowError('Chat does not exist!');
	});
});

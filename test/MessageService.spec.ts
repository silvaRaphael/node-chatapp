import { Message } from '../src/entities/Message';
import { ChatRepository } from '../src/repositories/ChatRepository';
import { MessageRepository } from '../src/repositories/MessageRepository';
import { ChatService } from '../src/services/ChatService';
import { MessageService } from '../src/services/MessageService';

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
			users: ['meu-id', 'outro-id'],
		});

		const { id } = chatCreated;

		const messageCreated = await messageService.createMessage({
			chat: id,
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
				users: ['meu-id', 'outro-id'],
			});

			const { id } = chatCreated;

			const messageCreated = await messageService.createMessage({
				chat: id,
				user: 'non-chat-user',
				content: 'This is my first message',
			});
		}).rejects.toThrowError('Chat does not exist!');
	});
});

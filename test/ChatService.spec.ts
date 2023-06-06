import { Chat } from '../src/entities/Chat';
import { ChatRepository } from '../src/repositories/ChatRepository';
import { ChatService } from '../src/services/ChatService';

describe('Chat Service test', () => {
	let chatRepository: ChatRepository;
	let chatService: ChatService;

	beforeAll(() => {
		chatRepository = new ChatRepository();
		chatService = new ChatService(chatRepository);
	});

	it('should be able to create a new chat', async () => {
		const chatCreated = await chatService.createChat({
			users: ['meu-id', 'outro-id'],
		});

		expect(chatCreated).toHaveProperty('id');
		expect(chatCreated).toBeInstanceOf(Chat);
	});

	it('should not be able to create a chat that already exists', async () => {
		await expect(async () => {
			await chatService.createChat({
				users: ['meu-id', 'outro-id'],
			});
		}).rejects.toThrowError('Chat already exists!');
	});

	it('should not be able to create a chat that I am not a participant', async () => {
		await expect(async () => {
			await chatService.createChat({
				users: ['outro-id', 'outro-id-2'],
			});
		}).rejects.toThrowError('Unauthorized!');
	});

	it('should be able to find the chat by id', async () => {
		const chatCreated = await chatService.createChat({
			users: ['meu-id', 'outro-id'],
		});

		const { id } = chatCreated;

		const chat = await chatService.getChatsByUserId(id);

		expect(chat[0]).toBeInstanceOf(Chat);
	});
});

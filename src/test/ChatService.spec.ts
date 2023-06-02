import { Chat } from '../entities/Chat';
import { ChatRepository } from '../repositories/ChatRepository';
import { ChatService } from '../services/ChatService';

describe('Chat Service test', () => {
	let chatRepository: ChatRepository;
	let chatService: ChatService;

	beforeAll(() => {
		chatRepository = new ChatRepository();
		chatService = new ChatService(chatRepository);
	});

	it('should be able to create a new chat', async () => {
		const chatCreated = await chatService.createChat({
			userId: 'meu-id',
			users: ['meu-id', 'outro-id'],
		});

		expect(chatCreated).toHaveProperty('id');
		expect(chatCreated).toBeInstanceOf(Chat);
	});

	it('should not be able to create a chat that already exists', async () => {
		await expect(async () => {
			await chatService.createChat({
				userId: 'meu-id',
				users: ['meu-id', 'outro-id'],
			});
		}).rejects.toThrowError('Chat already exists!');
	});

	it('should not be able to create a chat that I am not a participant', async () => {
		await expect(async () => {
			await chatService.createChat({
				userId: 'meu-id',
				users: ['outro-id', 'outro-id-2'],
			});
		}).rejects.toThrowError('Unauthorized!');
	});

	it('should be able to find the chat by id', async () => {
		const id = 'meu-id';

		const chat = await chatService.getChatsByUserId(id);

		expect(chat[0].users).toContain('meu-id');
		expect(chat[0]).toBeInstanceOf(Chat);
	});

	it('should be able to update a chat', async () => {
		const chatCreated = await chatService.updateChat({
			chat: 'meu-id',
			user: 'meu-id',
		});

		expect(chatCreated).toBeInstanceOf(Chat);
	});

	it('should not be able to update chat without id', async () => {
		await expect(async () => {
			await chatService.updateChat({
				chat: '',
				user: 'meu-id',
			});
		}).rejects.toThrowError('ID was not informed!');
	});

	it('should not be able to update a chat that does not exist', async () => {
		await expect(async () => {
			await chatService.updateChat({
				chat: 'non-existing-id',
				user: 'meu-id',
			});
		}).rejects.toThrowError('Chat does not exist!');
	});
});

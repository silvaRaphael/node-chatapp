"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("../src/entities/Message");
const ChatRepository_1 = require("../src/repositories/ChatRepository");
const MessageRepository_1 = require("../src/repositories/MessageRepository");
const ChatService_1 = require("../src/services/ChatService");
const MessageService_1 = require("../src/services/MessageService");
describe('Message Service test', () => {
    let messageRepository;
    let chatRepository;
    let messageService;
    let chatService;
    beforeAll(() => {
        messageRepository = new MessageRepository_1.MessageRepository();
        chatRepository = new ChatRepository_1.ChatRepository();
        messageService = new MessageService_1.MessageService(messageRepository, chatRepository);
        chatService = new ChatService_1.ChatService(chatRepository);
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
        expect(messageCreated).toBeInstanceOf(Message_1.Message);
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

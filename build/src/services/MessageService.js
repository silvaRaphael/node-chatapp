"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const Message_1 = require("../entities/Message");
class MessageService {
    constructor(messageRepository, chatRepository) {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
    }
    async createMessage({ chat, user, content }) {
        if (!chat || !user || !content.length)
            throw new Error('Missing data!');
        const chatExists = await this.chatRepository.findByChatIdAndUserId({
            chat,
            user,
        });
        if (!chatExists)
            throw new Error('Chat does not exist!');
        const message = new Message_1.Message({
            chat,
            user,
            content,
        });
        const messageCreated = await this.messageRepository.create(message);
        return messageCreated;
    }
    async getMessagesByChatId({ chat, user }) {
        if (!chat)
            throw new Error('ID was not informed!');
        const chatExists = await this.chatRepository.findByChatIdAndUserId({
            chat,
            user,
        });
        if (!chatExists)
            throw new Error('Chat does not exist!');
        const messages = await this.messageRepository.findByChatId(chat);
        return messages;
    }
}
exports.MessageService = MessageService;

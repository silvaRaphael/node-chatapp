"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const Chat_1 = require("../entities/Chat");
class ChatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    async createChat({ users }) {
        if (!users || users.length != 2)
            throw new Error('Missing data!');
        const chat = new Chat_1.Chat({ users });
        try {
            const chatCreated = await this.chatRepository.create(chat);
            return chatCreated;
        }
        catch (error) {
            throw error;
        }
    }
    async getChatById({ chat, user }) {
        if (!chat)
            throw new Error('ID was not informed!');
        const chatMatch = await this.chatRepository.findByChatIdAndUserId({
            chat,
            user,
        });
        if (!chatMatch)
            return null;
        return chatMatch;
    }
    async getChatsByUserId(id) {
        if (!id)
            throw new Error('ID was not informed!');
        const chats = await this.chatRepository.findByUserId(id);
        return chats;
    }
}
exports.ChatService = ChatService;

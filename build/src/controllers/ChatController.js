"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async createChat(request, response) {
        try {
            const { userId } = request;
            const { user } = request.body;
            const chat = await this.chatService.createChat({
                users: [userId, user],
            });
            return response.status(201).json(chat);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    }
    async getChatById(request, response) {
        try {
            const { userId } = request;
            const { id } = request.params;
            const chat = await this.chatService.getChatById({
                chat: id,
                user: userId,
            });
            return response.json(chat);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    }
    async getChatsByUserId(request, response) {
        try {
            const { userId } = request;
            const chats = await this.chatService.getChatsByUserId(userId);
            return response.json(chats);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    }
}
exports.ChatController = ChatController;

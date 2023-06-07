"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async createMessage(request, response) {
        const { userId } = request;
        const { chat, content } = request.body;
        try {
            const message = await this.messageService.createMessage({ chat, user: userId, content });
            return response.status(201).json(message);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    }
    async getMessagesByChatId(request, response) {
        const { userId } = request;
        const { chatId } = request.params;
        try {
            const messages = await this.messageService.getMessagesByChatId({
                chat: chatId,
                user: userId,
            });
            return response.json(messages);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    }
}
exports.MessageController = MessageController;

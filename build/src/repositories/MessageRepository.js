"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const MessageModels_1 = require("../models/MessageModels");
class MessageRepository {
    async create(message) {
        const messageCreated = await MessageModels_1.MessageModel.create({
            chat: message.chat,
            user: message.user,
            content: message.content,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
        });
        return Object.assign({ id: messageCreated._id.toString() }, messageCreated.toObject());
    }
    async findByChatId(chat) {
        const messages = await MessageModels_1.MessageModel.find({ chat }).populate('user', 'name').lean().exec();
        if (!messages)
            return [];
        return messages.map((message) => {
            return Object.assign({ id: message._id.toString() }, message);
        });
    }
}
exports.MessageRepository = MessageRepository;

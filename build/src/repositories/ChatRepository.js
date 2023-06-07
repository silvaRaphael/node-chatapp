"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const ChatModel_1 = require("../models/ChatModel");
class ChatRepository {
    async create(chat) {
        const [userId, user] = chat.users;
        const chatExists = await ChatModel_1.ChatModel.findOne({
            users: { $all: [userId, user] },
        })
            .lean()
            .exec();
        if (chatExists)
            throw new Error('Chat already exists!');
        const chatCreated = await ChatModel_1.ChatModel.create({
            _id: chat.id,
            users: chat.users,
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt,
        });
        return Object.assign({ id: chatCreated._id.toString() }, chatCreated.toObject());
    }
    async findByChatIdAndUserId({ chat, user }) {
        if (!isValidObjectId(chat))
            return null;
        const chatExists = await ChatModel_1.ChatModel.findOne({ _id: chat, users: { $in: [user] } })
            .populate('user', 'name')
            .exec();
        if (!chatExists)
            return null;
        return Object.assign({ id: chatExists._id.toString() }, chatExists.toObject());
    }
    async findByUserId(id) {
        if (!isValidObjectId(id))
            return [];
        const chats = await ChatModel_1.ChatModel.find({ users: { $in: [id] } })
            .populate('user', 'name')
            .lean()
            .exec();
        if (!chats)
            return [];
        return chats.map((chat) => {
            return Object.assign({ id: chat._id.toString() }, chat);
        });
    }
    async save(chat) {
        const chatMatch = await ChatModel_1.ChatModel.findOne({ _id: chat }).exec();
        if (!chatMatch)
            throw new Error('Chat does not exist!');
        const [firstUser, secondUser] = chatMatch.users;
        chatMatch.users = [firstUser, secondUser];
        await chatMatch.save();
    }
}
exports.ChatRepository = ChatRepository;

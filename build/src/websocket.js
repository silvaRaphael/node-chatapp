"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const app_1 = require("./app");
const configs_1 = require("./utils/configs");
const MessageRepository_1 = require("./repositories/MessageRepository");
const MessageService_1 = require("./services/MessageService");
const ChatRepository_1 = require("./repositories/ChatRepository");
const UserService_1 = require("./services/UserService");
const UserRepository_1 = require("./repositories/UserRepository");
const io = new socket_io_1.Server(app_1.server, {
    cors: configs_1.corsOptions,
});
io.on('connection', (socket) => {
    socket.on('select_chat', (data) => {
        if (data.prevChat)
            socket.leave(data.prevChat);
        socket.join(data.chat);
    });
    socket.on('chat_message', async (data) => {
        try {
            const messageRepository = new MessageRepository_1.MessageRepository();
            const chatRepository = new ChatRepository_1.ChatRepository();
            const messageService = new MessageService_1.MessageService(messageRepository, chatRepository);
            const messageCreated = await messageService.createMessage({
                chat: data.chat,
                user: data.user,
                content: data.message,
            });
            const userRepository = new UserRepository_1.UserRepository();
            const userService = new UserService_1.UserService(userRepository, null);
            const user = await userService.getUser(data.user);
            io.to(data.chat).emit('chat_message', {
                name: user === null || user === void 0 ? void 0 : user.name,
                user: data.user,
                message: data.message,
                createdAt: messageCreated.createdAt,
            });
        }
        catch (error) {
            io.to(data.chat).emit('chat_error', {
                message: error.message,
            });
        }
    });
});

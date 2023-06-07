import { Server } from 'socket.io';
import { server } from './app';
import { corsOptions } from './utils/configs';
import { MessageRepository } from './repositories/MessageRepository';
import { MessageService } from './services/MessageService';
import { ChatRepository } from './repositories/ChatRepository';
import { UserRepository } from './repositories/UserRepository';
import { AuthRepository } from './repositories/AuthRepository';
import { AuthService } from './services/AuthService';

const io = new Server(server, {
	cors: corsOptions,
});

io.on('connection', (socket) => {
	socket.on('select_chat', (data) => {
		if (data.prevChat) socket.leave(data.prevChat);

		socket.join(data.chat);
	});

	socket.on('chat_message', async (data) => {
		try {
			const messageRepository = new MessageRepository();
			const chatRepository = new ChatRepository();
			const messageService = new MessageService(messageRepository, chatRepository);
			const userRepository = new UserRepository();
			const authRepository = new AuthRepository(userRepository);
			const authService = new AuthService(authRepository);

			const user = await authService.verifyToken(data.token);

			if (!user) throw new Error('Invalid token!');

			const messageCreated = await messageService.createMessage({
				chat: data.chat,
				user: data.user,
				content: data.content,
			});

			io.to(data.chat).emit('chat_message', {
				name: user?.name,
				user: data.user,
				content: data.content,
				createdAt: messageCreated.createdAt,
			});
		} catch (error: any) {
			io.to(data.chat).emit('chat_error', {
				message: error.message,
			});
		}
	});
});

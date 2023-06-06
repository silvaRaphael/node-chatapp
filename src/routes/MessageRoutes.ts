import { Router } from 'express';
import { MessageRepository } from '../repositories/MessageRepository';
import { MessageService } from '../services/MessageService';
import { MessageController } from '../controllers/MessageController';
import { ChatRepository } from '../repositories/ChatRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const messageRoutes = Router();

const messageRepository = new MessageRepository();
const chatRepository = new ChatRepository();
const messageService = new MessageService(messageRepository, chatRepository);
const messageController = new MessageController(messageService);

messageRoutes.post('/messages', authMiddleware, (req, res) =>
	messageController.createMessage(req, res),
);
messageRoutes.get('/messages/:chatId', authMiddleware, (req, res) =>
	messageController.getMessagesByChatId(req, res),
);

export { messageRoutes };

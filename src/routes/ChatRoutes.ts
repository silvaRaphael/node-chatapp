import { Router } from 'express';
import { ChatRepository } from '../repositories/ChatRepository';
import { ChatService } from '../services/ChatService';
import { ChatController } from '../controllers/ChatController';
import { authMiddleware } from '../middlewares/authMiddleware';

const chatRoutes = Router();

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

chatRoutes.post('/chats', authMiddleware, (req, res) => chatController.createChat(req, res));
chatRoutes.get('/chats', authMiddleware, (req, res) => chatController.getChatsByUserId(req, res));
chatRoutes.get('/chats/:id', authMiddleware, (req, res) => chatController.getChatById(req, res));

export { chatRoutes };

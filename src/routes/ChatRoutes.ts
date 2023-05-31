import { Router } from 'express';
import { ChatRepository } from '../repositories/ChatRepository';
import { ChatService } from '../services/ChatService';
import { ChatController } from '../controllers/ChatController';

const chatRoutes = Router();

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

chatRoutes.post('/chats', chatController.createChat);
chatRoutes.get('/chats/:id', chatController.getChatsByUserId);

export { chatRoutes };

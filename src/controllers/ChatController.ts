import { Request, Response } from 'express';
import { ChatService } from '../services/ChatService';

export class ChatController {
	private chatService: ChatService;

	constructor(chatService: ChatService) {
		this.chatService = chatService;
	}

	async createChat(request: Request, response: Response): Promise<Response> {
		try {
			const { userId } = request as any;
			const { user } = request.body;

			const chat = await this.chatService.createChat({
				users: [userId, user],
			});

			return response.status(201).json(chat);
		} catch (error: any) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}

	async getChatById(request: Request, response: Response): Promise<Response> {
		try {
			const { userId } = request as any;
			const { id } = request.params;

			const chat = await this.chatService.getChatById({
				chat: id,
				user: userId,
			});

			return response.json(chat);
		} catch (error: any) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}

	async getChatsByUserId(request: Request, response: Response): Promise<Response> {
		try {
			const { userId } = request as any;

			const chats = await this.chatService.getChatsByUserId(userId);

			return response.json(chats);
		} catch (error: any) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}
}

import { Request, Response } from 'express';
import { ChatService } from '../services/ChatService';

export class ChatController {
	private chatService: ChatService;

	constructor(chatService: ChatService) {
		this.chatService = chatService;
	}

	async createChat(request: Request, response: Response): Promise<Response> {
		const { users } = request.body;

		try {
			const chat = await this.chatService.createChat({
				users,
			});

			return response.status(201).json(chat);
		} catch (error: any) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}

	async getChatsById(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		try {
			const chat = await this.chatService.getChatsById(id);

			return response.json(chat);
		} catch (error: any) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}

	async getChatsByUserId(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id } = request.params;

		try {
			const chats = await this.chatService.getChatsByUserId(id);

			return response.json(chats);
		} catch (error: any) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}
}

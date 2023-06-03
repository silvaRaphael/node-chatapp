import { Request, Response } from 'express';
import { MessageService } from '../services/MessageService';

export class MessageController {
	private messageService: MessageService;

	constructor(messageService: MessageService) {
		this.messageService = messageService;
	}

	async createMessage(request: Request, response: Response): Promise<Response> {
		try {
			const { chat, user, content } = request.body;

			const message = await this.messageService.createMessage({ chat, user, content });

			return response.status(201).json(message);
		} catch (error: any) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}

	async getMessagesByChatId(request: Request, response: Response): Promise<Response> {
		try {
			const { userId } = request as any;
			const { id } = request.params;

			const messages = await this.messageService.getMessagesByChatIdAndUserId({
				chat: id,
				user: userId,
			});

			return response.json(messages);
		} catch (error: any) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}
}

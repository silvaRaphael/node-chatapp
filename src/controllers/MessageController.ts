import { Request, Response } from 'express';
import { MessageService } from '../services/MessageService';

export class MessageController {
	private messageService: MessageService;

	constructor(messageService: MessageService) {
		this.messageService = messageService;
	}

	async createMessage(request: Request, response: Response): Promise<Response> {
		const { userId } = request as any;
		const { chat, content } = request.body;

		try {
			const message = await this.messageService.createMessage({ chat, user: userId, content });

			return response.status(201).json(message);
		} catch (error: any) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}

	async getMessagesByChatId(request: Request, response: Response): Promise<Response> {
		const { userId } = request as any;
		const { chatId } = request.params;

		try {
			const messages = await this.messageService.getMessagesByChatId({
				chat: chatId,
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

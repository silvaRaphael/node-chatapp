import { uuid } from 'uuidv4';

export interface IMessage {
	id?: string;
	user: string;
	chat: string;
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Message implements IMessage {
	public id: string;
	public user: string;
	public chat: string;
	public content: string;
	public createdAt: Date;
	public updatedAt: Date;

	constructor({ id, user, chat, content }: IMessage) {
		this.id = id || 'meu-id' /* uuid() */;
		this.user = user;
		this.chat = chat;
		this.content = content;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

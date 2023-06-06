import { randomBytes } from 'node:crypto';

export interface IMessage {
	id?: string;
	chat: string;
	user: string;
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Message implements IMessage {
	public id: string;
	public chat: string;
	public user: string;
	public content: string;
	public createdAt: Date;
	public updatedAt: Date;

	constructor({ id, chat, user, content }: IMessage) {
		this.id = id || randomBytes(12).toString('hex');
		this.chat = chat;
		this.user = user;
		this.content = content;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

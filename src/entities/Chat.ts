import { uuid } from 'uuidv4';

export interface IChat {
	id?: string;
	users: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

export class Chat implements IChat {
	public id: string;
	public users: string[];
	public createdAt: Date;
	public updatedAt: Date;

	constructor({ id, users }: IChat) {
		this.id = id || 'meu-id' /* uuid() */;
		this.users = users;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

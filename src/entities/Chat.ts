import { uuid } from 'uuidv4';

export interface IChat {
	id?: String;
	users: String[];
	createdAt?: Date;
	updatedAt?: Date;
}

export class Chat implements IChat {
	public id: String;
	public users: String[];
	public createdAt: Date;
	public updatedAt: Date;

	constructor({ id, users }: IChat) {
		this.id = id || 'meu-id' /* uuid() */;
		this.users = users;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

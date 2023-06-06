import { randomBytes } from 'node:crypto';

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
		this.id = id || randomBytes(12).toString('hex');
		this.users = users;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

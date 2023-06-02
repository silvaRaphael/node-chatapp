import { uuid } from 'uuidv4';

export interface IUser {
	id?: string;
	name: string;
	email: string;
	password: string;
	token?: string;
	createdAt?: string;
	updatedAt?: string;
}

export class User {
	public id: string;
	public name: string;
	public email: string;
	public password: string;
	public token: string;
	public createdAt: Date;
	public updatedAt: Date;

	constructor({ id, name, email, password }: IUser) {
		this.id = id || 'meu-id' /* uuid() */;
		this.name = name;
		this.email = email;
		this.password = password;
		this.token = 'meu-token' /* uuid() */;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

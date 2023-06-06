import { randomBytes } from 'node:crypto';

export interface IUser {
	id?: string;
	name: string;
	email: string;
	password: string;
	token?: string;
	createdAt?: Date;
	updatedAt?: Date;
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
		this.id = id || randomBytes(12).toString('hex');
		this.name = name;
		this.email = email;
		this.password = password;
		this.token = randomBytes(12).toString('hex');
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

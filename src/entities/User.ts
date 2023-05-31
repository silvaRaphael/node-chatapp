import { uuid } from 'uuidv4';

export interface IUser {
	id?: String;
	name: String;
	email: String;
	password: String;
	token?: String;
}

export class User {
	public id: String;
	public name: String;
	public email: String;
	public password: String;
	public token: String;

	constructor({ id, name, email, password }: IUser) {
		this.id = id || 'meu-id' /* uuid() */;
		this.name = name;
		this.email = email;
		this.password = password;
		this.token = 'meu-token' /* uuid() */;
	}
}

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	id: { type: String, unique: true },
	name: { type: String, required: true },
	email: { type: String, unique: true },
	password: { type: String, required: true },
	token: { type: String },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

export const UserModel = model('user', userSchema);

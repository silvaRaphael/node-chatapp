import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
	id: { type: String, unique: true },
	users: [{ type: String }],
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

export const chatModel = model('chat', chatSchema);

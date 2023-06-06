import { Schema, Types, model } from 'mongoose';

const chatSchema = new Schema({
	users: [{ type: Types.ObjectId, ref: 'user' }],
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

export const ChatModel = model('chat', chatSchema);

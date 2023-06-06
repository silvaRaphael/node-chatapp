import { Schema, Types, model } from 'mongoose';

const messageSchema = new Schema({
	chat: { type: Types.ObjectId, ref: 'chat' },
	user: { type: Types.ObjectId, ref: 'user' },
	content: { type: String, required: true },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

export const MessageModel = model('message', messageSchema);

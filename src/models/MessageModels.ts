import { Schema, Types, model } from 'mongoose';

const messageSchema = new Schema(
	{
		_id: { type: new Types.ObjectId(), unique: true },
		message: { type: Types.ObjectId, ref: 'message' },
		content: { type: String },
		createdAt: { type: Date },
		updatedAt: { type: Date },
	},
	{
		_id: false,
	},
);

export const MessageModel = model('message', messageSchema);

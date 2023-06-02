import { Schema, Types, model } from 'mongoose';

const userSchema = new Schema(
	{
		_id: { type: new Types.ObjectId(), unique: true },
		name: { type: String, required: true },
		email: { type: String, unique: true },
		password: { type: String, required: true },
		token: { type: String },
		createdAt: { type: Date },
		updatedAt: { type: Date },
	},
	{
		_id: false,
	},
);

export const UserModel = model('user', userSchema);

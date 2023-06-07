"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    chat: { type: mongoose_1.Types.ObjectId, ref: 'chat' },
    user: { type: mongoose_1.Types.ObjectId, ref: 'user' },
    content: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});
exports.MessageModel = (0, mongoose_1.model)('message', messageSchema);

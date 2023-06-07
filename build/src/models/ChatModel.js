"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    users: [{ type: mongoose_1.Types.ObjectId, ref: 'user' }],
    createdAt: { type: Date },
    updatedAt: { type: Date },
});
exports.ChatModel = (0, mongoose_1.model)('chat', chatSchema);

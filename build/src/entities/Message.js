"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const node_crypto_1 = require("node:crypto");
class Message {
    constructor({ id, chat, user, content }) {
        this.id = id || (0, node_crypto_1.randomBytes)(12).toString('hex');
        this.chat = chat;
        this.user = user;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.Message = Message;

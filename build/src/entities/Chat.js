"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const node_crypto_1 = require("node:crypto");
class Chat {
    constructor({ id, users }) {
        this.id = id || (0, node_crypto_1.randomBytes)(12).toString('hex');
        this.users = users;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.Chat = Chat;

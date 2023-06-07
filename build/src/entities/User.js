"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const node_crypto_1 = require("node:crypto");
class User {
    constructor({ id, name, email, password }) {
        this.id = id || (0, node_crypto_1.randomBytes)(12).toString('hex');
        this.name = name;
        this.email = email;
        this.password = password;
        this.token = (0, node_crypto_1.randomBytes)(12).toString('hex');
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.User = User;

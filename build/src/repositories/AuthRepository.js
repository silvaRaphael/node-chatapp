"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const node_crypto_1 = require("node:crypto");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = require("../models/UserModel");
class AuthRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async verifyToken(token) {
        const user = await UserModel_1.UserModel.findOne({ token }).exec();
        if (!user)
            return null;
        return Object.assign({ id: user._id.toString() }, user.toObject());
    }
    async signIn({ email, password }) {
        const user = await UserModel_1.UserModel.findOne({ email }).exec();
        if (!user)
            throw new Error('User does not exist!');
        const passwordMatches = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatches)
            throw new Error('Wrong password!');
        user.token = (0, node_crypto_1.randomBytes)(12).toString('hex');
        this.userRepository.save(user.toObject());
        return user.toObject();
    }
    async signOut(id) {
        const user = await UserModel_1.UserModel.findById(id).exec();
        if (user) {
            user.token = '';
            this.userRepository.save(user.toObject());
        }
    }
}
exports.AuthRepository = AuthRepository;

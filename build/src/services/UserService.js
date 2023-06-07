"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../entities/User");
const emailTemplates_1 = require("../utils/emailTemplates");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    constructor(userRepository, transporter) {
        this.userRepository = userRepository;
        this.transporter = transporter;
    }
    async createUser({ name, email, password }) {
        if (!name || !email || !password)
            throw new Error('Missing data!');
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.User({
            name,
            email,
            password: passwordHash,
        });
        try {
            const createdUser = await this.userRepository.create(user);
            createdUser.password = undefined;
            if (this.transporter) {
                this.transporter.sendMail({
                    from: 'miles.barrows@ethereal.email',
                    to: user.email,
                    subject: 'User created! 🎉',
                    html: (0, emailTemplates_1.newUserEmailTemplate)(user),
                });
            }
            return createdUser;
        }
        catch (error) {
            throw error;
        }
    }
    async getUser(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            return null;
        user.password = undefined;
        user.token = undefined;
        return user;
    }
    async updateUser({ id, name, email, password }) {
        if (!id)
            throw new Error('ID was not informed!');
        if (!name || !email || !password)
            throw new Error('Missing data!');
        try {
            const user = await this.userRepository.findById(id);
            if (!user)
                throw new Error('User does not exist!');
            const passwordHash = await bcryptjs_1.default.hash(password, 10);
            user.name = name;
            user.email = email;
            user.password = passwordHash;
            await this.userRepository.save(user);
            user.password = undefined;
            user.token = undefined;
            return user;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserService = UserService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mongoose_1 = require("mongoose");
const UserModel_1 = require("../models/UserModel");
class UserRepository {
    async create(user) {
        const userExists = await UserModel_1.UserModel.findOne({ email: user.email }).exec();
        if (userExists)
            throw new Error('Email already in use!');
        const userCreated = await UserModel_1.UserModel.create({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: user.token,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
        return Object.assign({ id: userCreated._id.toString() }, userCreated.toObject());
    }
    async findById(id) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            return null;
        const user = await UserModel_1.UserModel.findById(id).exec();
        if (!user)
            return null;
        return Object.assign({ id: user._id.toString() }, user.toObject());
    }
    async save(user) {
        const userMatch = await UserModel_1.UserModel.findById(user.id).exec();
        if (!userMatch)
            throw new Error('User does not exist!');
        userMatch.name = user.name;
        userMatch.email = user.email;
        userMatch.password = user.password;
        userMatch.updatedAt = new Date();
        await userMatch.save();
    }
}
exports.UserRepository = UserRepository;

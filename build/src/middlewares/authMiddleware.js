"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const AuthService_1 = require("../services/AuthService");
const AuthRepository_1 = require("../repositories/AuthRepository");
const userRepository = new UserRepository_1.UserRepository();
const authRepository = new AuthRepository_1.AuthRepository(userRepository);
const authService = new AuthService_1.AuthService(authRepository);
const authMiddleware = async (request, response, next) => {
    try {
        const { authorization } = request.headers;
        if (!authorization)
            throw new Error('Authorization header was not provided!');
        const [_, token] = authorization.split(' ');
        if (!token)
            throw new Error('Authorization token was not provided!');
        const userAuthenticated = await authService.verifyToken(token);
        if (!userAuthenticated)
            throw new Error('Unauthorized!');
        const { id } = userAuthenticated;
        request.userId = id;
        next();
    }
    catch (error) {
        response.status(401).json({
            message: error.message,
        });
    }
};
exports.authMiddleware = authMiddleware;

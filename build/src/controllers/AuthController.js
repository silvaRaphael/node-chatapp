"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async verifyToken(request, response) {
        try {
            const { authorization } = request.headers;
            if (!authorization)
                throw new Error('Authorization header was not provided!');
            const [_, token] = authorization.split(' ');
            if (!token)
                throw new Error('Authorization token was not provided!');
            const userAuthenticated = await this.authService.verifyToken(token);
            if (!userAuthenticated)
                throw new Error('Unauthorized!');
            return response.status(200).json(userAuthenticated);
        }
        catch (error) {
            return response.status(401).json({
                message: error.message,
            });
        }
    }
    async signIn(request, response) {
        try {
            const { email, password } = request.body;
            const user = await this.authService.signIn({
                email,
                password,
            });
            user.password = undefined;
            return response.status(200).json(user);
        }
        catch (error) {
            return response.status(401).json({
                message: error.message,
            });
        }
    }
    async signOut(request, response) {
        try {
            const { userId } = request;
            const user = await this.authService.signOut(userId);
            return response.status(200).end();
        }
        catch (error) {
            return response.status(401).json({
                message: error.message,
            });
        }
    }
}
exports.AuthController = AuthController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(request, response) {
        try {
            const { name, email, password } = request.body;
            const user = await this.userService.createUser({
                name,
                email,
                password,
            });
            return response.status(201).json(user);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    }
    async getUser(request, response) {
        const { id } = request.params;
        try {
            const user = await this.userService.getUser(id);
            return response.json(user);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    }
    async updateUser(request, response) {
        try {
            const { userId } = request;
            const { name, email, password } = request.body;
            const user = await this.userService.updateUser({
                id: userId,
                name,
                email,
                password,
            });
            return response.json(user);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    }
}
exports.UserController = UserController;

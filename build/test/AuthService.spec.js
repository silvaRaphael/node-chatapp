"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../src/controllers/AuthController");
const AuthRepository_1 = require("../src/repositories/AuthRepository");
const UserRepository_1 = require("../src/repositories/UserRepository");
const AuthService_1 = require("../src/services/AuthService");
const UserService_1 = require("../src/services/UserService");
describe('Auth service test', () => {
    let userRepository;
    let userService;
    let authRepository;
    let authService;
    let authController;
    let userCreated;
    beforeAll(async () => {
        userRepository = new UserRepository_1.UserRepository();
        userService = new UserService_1.UserService(userRepository, null);
        authRepository = new AuthRepository_1.AuthRepository(userRepository);
        authService = new AuthService_1.AuthService(authRepository);
        authController = new AuthController_1.AuthController(authService);
        userCreated = await userService.createUser({
            name: 'teste',
            email: `teste${Math.random() * 1000}@teste.com`,
            password: '123456',
        });
    });
    it('should be able to sign in with email and password', async () => {
        const userCredencials = {
            email: 'teste99@teste.com',
            password: '123456',
        };
        const userLogged = await authService.signIn(userCredencials);
        expect(userLogged).toHaveProperty('token');
    });
    it('should be able to verify if token is valid', async () => {
        const { token } = userCreated;
        const tokenValid = await authService.verifyToken(token);
        expect(tokenValid === null || tokenValid === void 0 ? void 0 : tokenValid.name).toBe('teste');
    });
    it('should be able to verify if token is not valid', async () => {
        const token = 'non-existing-token';
        const tokenValid = await authService.verifyToken(token);
        expect(tokenValid).toBe(null);
    });
});

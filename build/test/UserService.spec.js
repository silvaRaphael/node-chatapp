"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../src/entities/User");
const UserRepository_1 = require("../src/repositories/UserRepository");
const UserService_1 = require("../src/services/UserService");
describe('UserService', () => {
    let userRepository;
    let userService;
    let id;
    beforeAll(() => {
        userRepository = new UserRepository_1.UserRepository();
        userService = new UserService_1.UserService(userRepository, null);
    });
    it('should be able to create an user', async () => {
        const userCreated = await userService.createUser({
            name: 'teste',
            email: `teste${Math.random() * 1000}@teste.com`,
            password: '123456',
        });
        id = userCreated.id;
        expect(userCreated).toHaveProperty('id');
        expect(userCreated).toBeInstanceOf(User_1.User);
    });
    it('should be able to find the user by id', async () => {
        const user = await userService.getUser(id);
        expect(user === null || user === void 0 ? void 0 : user.name).toBe('teste');
        expect(user).toBeInstanceOf(User_1.User);
    });
    it('should be able to update user', async () => {
        const userUpdated = await userService.updateUser({
            id,
            name: 'name2',
            email: 'email2',
            password: 'password2',
        });
        expect(userUpdated.name).toBe('name2');
        expect(userUpdated).toBeInstanceOf(User_1.User);
    });
    it('should not be able to update user without id', async () => {
        await expect(async () => {
            await userService.updateUser({
                id: '',
                name: 'name3',
                email: 'email3',
                password: 'password3',
            });
        }).rejects.toThrowError('ID was not informed!');
    });
    it('should not be able to update user that does not exists', async () => {
        await expect(async () => {
            await userService.updateUser({
                id: 'non-existing-id',
                name: 'name3',
                email: 'email3',
                password: 'password3',
            });
        }).rejects.toThrowError('User does not exist!');
    });
});

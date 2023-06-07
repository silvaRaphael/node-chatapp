"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async verifyToken(token) {
        const user = await this.authRepository.verifyToken(token);
        user.password = undefined;
        user.token = undefined;
        return user;
    }
    async signIn({ email, password }) {
        if (!email || !password)
            throw new Error('Missing data!');
        try {
            const userAuthenticated = await this.authRepository.signIn({
                email,
                password,
            });
            userAuthenticated.password = undefined;
            return userAuthenticated;
        }
        catch (error) {
            throw error;
        }
    }
    async signOut(id) {
        try {
            await this.authRepository.signOut(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AuthService = AuthService;

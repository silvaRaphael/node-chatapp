import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { AuthRepository } from '../repositories/AuthRepository';
import { UserRepository } from '../repositories/UserRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const authRoutes = Router();

const userRepository = new UserRepository();
const authRepository = new AuthRepository(userRepository);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRoutes.post('/auth/signin', (req, res) => authController.signIn(req, res));
authRoutes.post('/auth/verify-token', (req, res) => authController.verifyToken(req, res));
authRoutes.post('/auth/signout', authMiddleware, (req, res) => authController.signOut(req, res));

export { authRoutes };

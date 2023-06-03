import { Router } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { transporter } from '../providers/emailProvider';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository, transporter);
const userController = new UserController(userService);

userRoutes.post('/users', (req, res) => userController.createUser(req, res));
userRoutes.get('/users/:id', authMiddleware, (req, res) => userController.getUser(req, res));
userRoutes.put('/users/:id', authMiddleware, (req, res) => userController.updateUser(req, res));

export { userRoutes };

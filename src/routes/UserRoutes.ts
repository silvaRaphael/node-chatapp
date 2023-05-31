import { Router } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.post('/users', userController.createUser);

userRoutes.use(authMiddleware);

userRoutes.get('/users/:id', userController.getUser);
userRoutes.put('/users/:id', userController.updateUser);

export { userRoutes };

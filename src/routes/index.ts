import { Router } from 'express';
import { userRoutes } from './UserRoutes';
import { chatRoutes } from './ChatRoutes';
import { authMiddleware } from '../middlewares/authMiddleware';
import { messageRoutes } from './MessageRoutes';

const routes = Router();

routes.use(userRoutes);

// routes.use(authMiddleware);

routes.use(messageRoutes);
routes.use(chatRoutes);

export { routes };

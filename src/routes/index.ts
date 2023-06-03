import { Router } from 'express';
import { userRoutes } from './UserRoutes';
import { chatRoutes } from './ChatRoutes';
import { messageRoutes } from './MessageRoutes';
import { authRoutes } from './AuthRoutes';

const routes = Router();

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(messageRoutes);
routes.use(chatRoutes);

export { routes };

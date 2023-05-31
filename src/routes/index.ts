import { Router } from 'express';
import { userRoutes } from './UserRoutes';
import { chatRoutes } from './ChatRoutes';
import { authMiddleware } from '../middlewares/authMiddleware';

const routes = Router();

routes.use(userRoutes);

routes.use(authMiddleware);

routes.use(chatRoutes);

export { routes };

import { Router } from 'express';

import { AuthMiddleware } from '@/shared/middlewares/auth.middleware';

import { UserController } from './controller';

export const UserRoute = Router();

UserRoute.get('/me', AuthMiddleware, UserController.me);

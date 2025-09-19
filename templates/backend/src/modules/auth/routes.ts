/* eslint-disable prettier/prettier */

import { Router } from 'express';

import { ValidateMiddleware } from '@/shared/middlewares/validate.middleware';

import { AuthController } from './controller';
import { AuthValidation } from './validation';

export const AuthRoute = Router();

AuthRoute.post('/login', ValidateMiddleware(AuthValidation.login), AuthController.login);
AuthRoute.post('/register', ValidateMiddleware(AuthValidation.register), AuthController.register);

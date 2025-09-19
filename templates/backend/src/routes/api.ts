import { Router } from 'express';

import { AuthRoute } from '@/modules/auth/routes';
import { UserRoute } from '@/modules/user/routes';

export const api = Router();

api.use('/auth', AuthRoute);
api.use('/users', UserRoute);

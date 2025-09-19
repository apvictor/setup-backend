/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { env } from '@/config/env';
import { ApiError } from '@/config/errors/api-error';
import { MapErrors } from '@/config/errors/map-errors';
import { IUserAuth } from '@/modules/user/model';
import { UserRepository } from '@/modules/user/repository';

export const AuthMiddleware = MapErrors(
  async (request: IUserAuth, _: Response, next: NextFunction) => {
    // #swagger.auto = false

    const { authorization } = request.headers;

    if (!authorization) throw new ApiError(400, 'Token não fornecido');

    const token = authorization.replace('Bearer ', '');

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload & {
      userId: number;
    };

    if (!decoded || !decoded.userId) throw new ApiError(401, 'Token inválido');

    const { password, ...user } = await UserRepository.getById(decoded.userId);

    request.user = user;

    next();
  },
);

/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { env } from '@/shared/config/env';
import { ApiError } from '@/shared/config/errors/api-error';
import { MapErrors } from '@/shared/config/errors/map-errors';

export const AuthMiddleware = MapErrors(
  async (request: Request, _: Response, next: NextFunction) => {
    // #swagger.auto = false

    const { authorization } = request.headers;

    if (!authorization) throw new ApiError(400, 'Token não fornecido');

    const token = authorization.replace('Bearer ', '');

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET as string,
    ) as JwtPayload & {
      userId: number;
    };

    if (!decoded || !decoded.userId) throw new ApiError(401, 'Token inválido');

    request.userId = decoded.userId;

    next();
  },
);

import { compareSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '@/config/env';
import { ApiError } from '@/config/errors/api-error';
import { MapErrors } from '@/config/errors/map-errors';

import { UserRepository } from '../user/repository';

export const login = MapErrors(async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await UserRepository.getByEmail(email);
  if (!user) throw new ApiError(400, 'E-mail ou senha incorretos');

  const match = compareSync(password, user.password);
  if (!match) throw new ApiError(400, 'E-mail ou senha incorretos');

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET as string, {
    expiresIn: '8h',
  });

  return response.json({
    token,
    data: user,
    message: 'Usuário autenticado com sucesso!',
  });
});

const register = MapErrors(async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const passwordHash = hashSync(password, 10);

  const data = await UserRepository.create({
    name,
    email,
    password: passwordHash,
  });

  return response.json({
    data,
    message: 'Usuário cadastrado com sucesso!',
  });
});

export const AuthController = { login, register };

import { Response } from 'express';

import { MapErrors } from '@/config/errors/map-errors';

import { IUserAuth } from './model';

const me = MapErrors(async (request: IUserAuth, response: Response) => {
  const user = request.user;

  return response.status(200).json(user);
});

export const UserController = {
  me,
};

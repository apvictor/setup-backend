import { Request } from 'express';

export interface IUserAuth extends Request {
  user: Omit<IUser, 'password'>;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

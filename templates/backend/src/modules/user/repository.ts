/* eslint-disable @typescript-eslint/no-unused-vars */

import { ApiError } from '@/config/errors/api-error';
import { PrismaService } from '@/shared/services/prisma.service';

import { IUser } from './model';

async function create(data: Omit<IUser, 'id'>) {
  const { password, ...rest } = await PrismaService.users.create({
    data,
  });

  return rest;
}

async function getByEmail(email: string) {
  const data = await PrismaService.users.findUnique({ where: { email } });

  return data;
}

async function getAll() {
  const data = await PrismaService.users.findMany();

  return { data };
}

async function getById(id: number) {
  const data = await PrismaService.users.findUnique({ where: { id } });

  if (!data) throw new ApiError(400, 'Não foi possível encontrar users.id');

  return data;
}

async function update(id: number, data: IUser) {
  const users = await PrismaService.users.update({ where: { id }, data });

  return users.id;
}

export const UserRepository = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
};

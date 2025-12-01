import { PrismaClient } from '@prisma/client';

export const PrismaService = new PrismaClient({
  // log: ['query'],
});

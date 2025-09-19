import { PrismaService } from '@/shared/services/prisma.service';

import { env } from './env';

export function getHost() {
  let host = '';
  if (env.SERVER_HOST.includes('localhost'))
    host = `${env.SERVER_SCHEME}://${env.SERVER_HOST}:${env.SERVER_PORT}`;
  else host = `${env.SERVER_SCHEME}://${env.SERVER_HOST}`;
  return host;
}

export async function checkDatabaseConnection() {
  try {
    await PrismaService.$connect();
    console.info('✅ Sucesso ao conectar com banco de dados');
    return true;
  } catch (error) {
    console.error('❌ Falha ao conectar com banco de dados:', error);
    process.exit(1);
  }
}

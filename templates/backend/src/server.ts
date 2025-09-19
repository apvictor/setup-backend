import { app } from './app';
import { checkDatabaseConnection, getHost } from './config';
import { env } from './config/env';

const host = getHost();

checkDatabaseConnection().then(() => {
  app.listen(env.SERVER_PORT, () =>
    console.info(`🚀 Servidor executando ${host}`),
  );
});

import { app } from './app';
import { checkDatabaseConnection, getHost } from './shared/config';
import { env } from './shared/config/env';

const host = getHost();

app.listen(env.SERVER_PORT, async () => {
  await checkDatabaseConnection();
  console.info(`🚀 Servidor executando ${host}`);
});

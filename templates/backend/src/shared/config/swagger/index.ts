import { exit } from 'process';
import swaggerAutogen from 'swagger-autogen';

import { env } from '../env';

const outputFile = '../swagger/swagger_output.json';
const endpointsFiles = ['../../routes/api'];

const doc = {
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: '',
    contact: { name: 'Armando Pereira' },
  },
  host: `${env.SERVER_HOST}${env.SERVER_SCHEME == 'https' ? '' : `:${env.SERVER_PORT}`}`,
  basePath: '/',
  schemes: [env.SERVER_SCHEME],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'authorization',
      description: 'Token Authorization',
    },
  },
};

swaggerAutogen({ language: 'pt-BR' })(outputFile, endpointsFiles, doc).then(
  () => exit(),
);

import cors from 'cors';
import express, { Response } from 'express';
import { serve, setup } from 'swagger-ui-express';

import { ErrorHandler } from './config/errors/error-handler';
import swaggerFile from './config/swagger/swagger_output.json';
import { api } from './routes/api';

export const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (_, response: Response) => response.redirect('/swagger'));

app.use('/swagger', serve, setup(swaggerFile));

app.use(api);

app.use('*', ErrorHandler.generics());

app.use(ErrorHandler.handle());

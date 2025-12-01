import * as yup from 'yup';

const envSchema = yup.object({
  PROJECT_NAME: yup.string().default('PROJECT_NAME'),
  NODE_ENV: yup.string().oneOf(['dev', 'prod', 'test']).default('dev'),
  SERVER_SCHEME: yup.string().default('http'),
  SERVER_PORT: yup
    .number()
    .transform((_val, orig) => (orig ? Number(orig) : undefined))
    .typeError('SERVER_PORT precisa ser um número')
    .default(3000),
  SERVER_HOST: yup.string().default('localhost'),

  JWT_SECRET: yup.string(),

  DB_USER: yup.string(),
  DB_HOST: yup.string(),
  DB_NAME: yup.string(),
  DB_PASS: yup.string(),
  DB_PORT: yup
    .number()
    .transform((_val, orig) => (orig ? Number(orig) : undefined))
    .typeError('DB_PORT precisa ser um número')
    .default(5432),
});

// validação sincrona
export const env = envSchema.validateSync(process.env, {
  stripUnknown: true,
});

// tipagem automática em TS
export type Env = yup.InferType<typeof envSchema>;

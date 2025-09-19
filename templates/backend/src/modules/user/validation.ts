import { object, string } from 'yup';

export const UserValidation = {
  update: object({
    body: object({
      name: string().required('Campo obrigatório'),
      email: string().required('Campo obrigatório'),
    }),
  }),
};

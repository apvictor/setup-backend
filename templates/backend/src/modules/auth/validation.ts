import { object, string } from 'yup';

export const AuthValidation = {
  register: object({
    body: object({
      name: string().required('Campo obrigatório'),
      email: string().email().required('Campo obrigatório'),
      password: string().min(8).required('Campo obrigatório'),
    }),
  }),
  login: object({
    body: object({
      email: string().email().required('Campo obrigatório'),
      password: string().min(8).required('Campo obrigatório'),
    }),
  }),
};

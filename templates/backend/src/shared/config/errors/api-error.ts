export class ApiError extends Error {
  field?: string;
  status: number;

  constructor(status: number, message: string, field?: string) {
    super(message);
    this.status = status;
    this.field = field;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor() {
    super(404, 'A solicitação não foi encontrada');
  }
}

export class UnauthorizedError extends ApiError {
  constructor() {
    super(401, 'Você não está autorizado a acessar');
  }
}

export class InternalServerError extends ApiError {
  constructor() {
    super(500, 'Erro do Servidor Interno');
  }
}

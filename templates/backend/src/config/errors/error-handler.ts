/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { ApiError, NotFoundError } from './api-error';

export class ErrorHandler {
  static handle = () => {
    return (
      error: ApiError,
      _request: Request,
      response: Response,
      _next: NextFunction,
    ) => {
      const status = error.status || 500;

      if (error.field) {
        return response
          .status(status)
          .json({ field: error.field, error: error.message });
      }

      return response.status(status).json({ error: error.message });
    };
  };

  static generics = () => {
    return (_request: Request, _response: Response, next: NextFunction) => {
      next(new NotFoundError());
    };
  };
}

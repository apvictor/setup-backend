/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

export const MapErrors =
  (fn: any) => (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve(fn(request, response, next)).catch((error: Error) =>
      next(error),
    );
  };

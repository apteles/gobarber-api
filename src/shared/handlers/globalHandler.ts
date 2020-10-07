import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

export default (
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response<{ status: string; message: string }> => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err.message, // 'Internal server error',
  });
};

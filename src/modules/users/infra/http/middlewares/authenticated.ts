import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not provided');
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.APP_SECRET as string);
    const { sub: id } = decoded as TokenPayload;
    request.user = { id };
    next();
  } catch (error) {
    throw new AppError('Invalid token');
  }
}

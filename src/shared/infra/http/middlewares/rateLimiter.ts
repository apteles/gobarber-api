import { Response, Request, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import cacheConfig from '@config/cache';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: cacheConfig.config.redis.host,
  port: cacheConfig.config.redis.port,
  password: cacheConfig.config.redis.password,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});
export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    next();
  } catch (error) {
    throw new AppError('request limit exceeded', 429);
  }
}

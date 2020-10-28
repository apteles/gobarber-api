import { container } from 'tsyringe';
import RedisCacheProvider from './implementations/RedisCacheProvider';
import CacheProviderInterface from './models/CacheProviderInterface';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<CacheProviderInterface>(
  'CacheProvider',
  providers.redis,
);

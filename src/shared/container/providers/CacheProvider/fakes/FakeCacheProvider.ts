import CacheProviderInterface from '../models/CacheProviderInterface';

export default class FakeCacheProvider implements CacheProviderInterface {
  private cache: { [key: string]: string } = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidateByPrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => delete this.cache[key]);
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }
}

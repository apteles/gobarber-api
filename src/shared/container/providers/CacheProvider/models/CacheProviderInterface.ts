export default interface CacheProviderInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(key: string, value: any): Promise<void>;
  invalidate(key: string): Promise<void>;
  invalidateByPrefix(prefix: string): Promise<void>;
  get<T>(key: string): Promise<T | null>;
}

import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import UserRepositoryInterface from '@modules/users/repositories/UserRepositoryInterface';
import CacheProviderInterface from '@shared/container/providers/CacheProvider/models/CacheProviderInterface';

interface Request {
  user_id: string;
}
@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
    @inject('CacheProvider')
    private cache: CacheProviderInterface,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const hasCache = await this.cache.get<User[]>(`providers-list:${user_id}`);

    if (hasCache) {
      return hasCache;
    }

    const providers = await this.userRepository.findAllProviders({
      except: { id: user_id },
    });

    await this.cache.save(
      `providers-list:${user_id}`,
      JSON.stringify(providers),
    );
    return providers;
  }
}

export default ListProviderService;

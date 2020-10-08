import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import UserRepositoryInterface from '@modules/users/repositories/UserRepositoryInterface';

interface Request {
  user_id: string;
}
@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const providers = await this.userRepository.findAllProviders({
      except: { id: user_id },
    });
    return providers;
  }
}

export default ListProviderService;

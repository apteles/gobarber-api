import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';

interface Request {
  user_id: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.verifyIfUserExits(user_id);

    return user;
  }

  private async verifyIfUserExits(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }

    return user;
  }
}

export default UpdateProfileService;

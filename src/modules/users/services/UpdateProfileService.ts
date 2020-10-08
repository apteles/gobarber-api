import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';
import HashInterface from '../providers/HashProvider/models/HashInterface';

interface Request {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
    @inject('BCryptHashProvider')
    private hashProvider: HashInterface,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: Request): Promise<User> {
    let user = await this.verifyIfUserAlreadyExits(user_id);

    await this.emailChosenAlreadyTaken(email, user_id);

    Object.assign(user, {
      name,
      email,
    });

    if (password) {
      if (!old_password) {
        throw new AppError('Old password must be passed');
      }

      await this.oldPasswordIsCorrect(old_password, user_id);

      Object.assign(user, {
        password: await this.hashProvider.generateHash(password),
      });
    }

    if (password) {
      Object.assign(user, {
        password: await this.hashProvider.generateHash(password),
      });
    }

    user = await this.userRepository.save(user);

    return user;
  }

  private async verifyIfUserAlreadyExits(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }

    return user;
  }

  private async emailChosenAlreadyTaken(
    email: string,
    id: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);

    if (user && user.id !== id) {
      throw new AppError('Email already taken', 400);
    }

    return false;
  }

  private async oldPasswordIsCorrect(
    oldPassword: string,
    userId: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findById(userId);

    if (user) {
      const isSame = await this.hashProvider.compareHash(
        oldPassword,
        user?.password,
      );

      if (!isSame) {
        throw new AppError('Old Password informed does not match', 400);
      }
    }
    return true;
  }
}

export default UpdateProfileService;

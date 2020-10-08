import { differenceInHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import HashInterface from '../providers/HashProvider/models/HashInterface';
// import User from '@modules/users/infra/typeorm/entities/User';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';
import UserTokenRepositoryInterface from '../repositories/UserTokenRepositoryInterface';

interface Request {
  password: string;
  token: string;
}
@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
    @inject('UserTokenRepository')
    private userTokenRepository: UserTokenRepositoryInterface,
    @inject('BCryptHashProvider')
    private hashProvider: HashInterface,
  ) {}

  public async execute({ password, token }: Request): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User does not exists', 400);
    }
    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }

    if (differenceInHours(Date.now(), userToken.created_at) > 2) {
      throw new AppError('Token expired', 400);
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

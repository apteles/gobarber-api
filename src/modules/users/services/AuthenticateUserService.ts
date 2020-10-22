import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';
import HashInterface from '../providers/HashProvider/models/HashInterface';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
    @inject('BCryptHashProvider')
    private hashProvider: HashInterface,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const isMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, authConfig.secret as string, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

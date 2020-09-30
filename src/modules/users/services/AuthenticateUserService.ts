import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';

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
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      subject: user.id,
      expiresIn: '7d',
    });

    return {
      user,
      token,
    };
  }
}

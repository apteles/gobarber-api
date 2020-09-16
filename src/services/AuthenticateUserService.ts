import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

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

    delete user.password;
    delete user.created_at;
    delete user.updated_at;

    return {
      user,
      token,
    };
  }
}

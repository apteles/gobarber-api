import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private userRepository: UserRepositoryInterface) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email addres already exists');
    }

    const hashedPassword = await hash(password, 8);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

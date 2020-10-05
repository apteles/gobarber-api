import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';
import HashInterface from '../providers/HashProvider/models/HashInterface';

interface Request {
  name: string;
  email: string;
  password: string;
}
injectable();
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
    @inject('BCryptHashProvider')
    private hashProvider: HashInterface,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

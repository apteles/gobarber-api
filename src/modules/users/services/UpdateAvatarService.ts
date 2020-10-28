import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import StorageInterface from '@shared/container/providers/StorageProvider/models/StorageInterface';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
    @inject('DiskStorageProvider')
    private storageProvider: StorageInterface,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can update avatar', 401);
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);
    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;

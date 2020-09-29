import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';

interface Request {
  user_id: string;
  avatarFileName: string;
}
class UpdateAvatarService {
  constructor(private userRepository: UserRepositoryInterface) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can update avatar', 401);
    }

    if (user.avatar) {
      const avatarPath = path.join(uploadConfig.tempPath, user.avatar);
      const avatarFileExists = await fs.promises.stat(avatarPath);
      if (avatarFileExists) {
        await fs.promises.unlink(avatarPath);
      }
    }

    if (user.avatar === avatarFileName) {
      return user;
    }
    user.avatar = avatarFileName;

    await this.userRepository.create(user);

    return user;
  }
}

export default UpdateAvatarService;

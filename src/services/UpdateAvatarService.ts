import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}
class UpdateAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

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

    await userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;

import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      user: { id: user_id },
    } = request;
    const updateAvatar = container.resolve(UpdateAvatarService);
    const user = await updateAvatar.execute({
      user_id,
      avatarFileName: request.file.filename,
    });
    return response.json(classToClass(user));
  }
}

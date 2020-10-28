import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const profile = await showProfileService.execute({
      user_id,
    });

    return response.json(classToClass(profile));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const profile = await updateProfileService.execute({
      name,
      email,
      old_password,
      password,
      user_id,
    });

    return response.json(profile);
  }
}

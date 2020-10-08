import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listProviderService = container.resolve(ListProvidersService);

    const provider = await listProviderService.execute({
      user_id: id,
    });

    return response.json(provider);
  }
}

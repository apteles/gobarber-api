import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { id } = request.params;

    const listProviderDayService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const provider = await listProviderDayService.execute({
      user_id: id,
      day,
      month,
      year,
    });

    return response.json(provider);
  }
}

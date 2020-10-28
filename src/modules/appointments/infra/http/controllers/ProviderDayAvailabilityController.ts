import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.query;
    const { id } = request.params;

    const listProviderDayService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const provider = await listProviderDayService.execute({
      user_id: id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(provider);
  }
}

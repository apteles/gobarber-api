import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const { id } = request.params;
    const listProviderAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const provider = await listProviderAvailabilityService.execute({
      user_id: id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(provider);
  }
}

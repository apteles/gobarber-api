import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { id } = request.user;

    const appointmentProvider = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await appointmentProvider.execute({
      user_id: id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

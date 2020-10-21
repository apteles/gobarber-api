import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { date, provider_id } = request.body;
    const { id } = request.user;
    const parsedDate = parseISO(date);

    const appointmentServiceCreate = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await appointmentServiceCreate.execute({
      date: parsedDate,
      provider_id,
      user_id: id,
    });

    return response.json(appointment);
  }
}

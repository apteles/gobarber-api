import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import authenticated from '@modules/users/infra/http/middlewares/authenticated';

const appointmentRouter = Router();

appointmentRouter.use(authenticated);

// appointmentRouter.get('/', async (request, response) => {
//  const appointmentRepository = new AppointmentRepository();
//  const appointments = await appointmentRepository.find();
//  return response.json(appointments);
// });

appointmentRouter.post('/', async (request, response) => {
  const { date, provider_id } = request.body;

  const parsedDate = parseISO(date);

  const appointmentServiceCreate = new CreateAppointmentService(
    new AppointmentRepository(),
  );

  const appointment = await appointmentServiceCreate.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentRouter;

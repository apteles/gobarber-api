import { Router } from 'express';
import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentController from '../controllers/ProviderAppointmentController';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();
const appointmentProviderController = new ProviderAppointmentController();
appointmentRouter.use(authenticated);

// appointmentRouter.get('/', async (request, response) => {
//  const appointmentRepository = new AppointmentRepository();
//  const appointments = await appointmentRepository.find();
//  return response.json(appointments);
// });

appointmentRouter.get('/me', appointmentProviderController.index);

appointmentRouter.post('/', appointmentController.create);

export default appointmentRouter;

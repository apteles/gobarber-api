import { Router } from 'express';
import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();
appointmentRouter.use(authenticated);

// appointmentRouter.get('/', async (request, response) => {
//  const appointmentRepository = new AppointmentRepository();
//  const appointments = await appointmentRepository.find();
//  return response.json(appointments);
// });

appointmentRouter.post('/', appointmentController.create);

export default appointmentRouter;

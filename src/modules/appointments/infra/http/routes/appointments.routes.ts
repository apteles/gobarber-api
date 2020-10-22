import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentController from '../controllers/ProviderAppointmentController';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();
const appointmentProviderController = new ProviderAppointmentController();
appointmentRouter.use(authenticated);

appointmentRouter.get('/me', appointmentProviderController.index);

appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentController.create,
);

export default appointmentRouter;

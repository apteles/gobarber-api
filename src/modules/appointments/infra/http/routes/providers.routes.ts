import { Router } from 'express';
import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import ProviderController from '../controllers/ProviderController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providerRouter = Router();
const providerController = new ProviderController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
providerRouter.use(authenticated);

providerRouter.get('/', providerController.index);
providerRouter.get(
  '/:id/day-availability',
  providerDayAvailabilityController.index,
);
providerRouter.get(
  '/:id/month-availability',
  providerMonthAvailabilityController.index,
);

export default providerRouter;

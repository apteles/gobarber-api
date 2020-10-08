import { Router } from 'express';
import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import ProviderController from '../controllers/ProviderController';

const providerRouter = Router();
const providerController = new ProviderController();
providerRouter.use(authenticated);

providerRouter.get('/', providerController.index);

export default providerRouter;

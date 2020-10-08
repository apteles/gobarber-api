import { Router } from 'express';
import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(authenticated);
profileRouter.get('/', profileController.index);
profileRouter.put('/', profileController.update);

export default profileRouter;

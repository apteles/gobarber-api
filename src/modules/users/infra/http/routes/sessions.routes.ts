import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const usersRouter = Router();
const sessionsControler = new SessionsController();

usersRouter.post('/', sessionsControler.create);

export default usersRouter;

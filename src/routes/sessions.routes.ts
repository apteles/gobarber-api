import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticatedUser = new AuthenticateUserService();
  const session = await authenticatedUser.execute({ email, password });

  return response.json(session);
});

export default usersRouter;

import { Router } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticatedUser = container.resolve(AuthenticateUserService);

  const session = await authenticatedUser.execute({ email, password });

  return response.json(session);
});

export default usersRouter;

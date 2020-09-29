import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '../../typeorm/repositories/UserRepository';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const userRepository = new UserRepository();

  const authenticatedUser = new AuthenticateUserService(userRepository);
  const session = await authenticatedUser.execute({ email, password });

  return response.json(session);
});

export default usersRouter;

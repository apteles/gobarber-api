import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';
import authenticated from '@modules/users/infra/http/middlewares/authenticated';
import uploadConfig from '@config/upload';
import UserRepository from '../../typeorm/repositories/UserRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const userRepository = new UserRepository();
  const userService = new CreateUserService(userRepository);
  const user = await userService.execute({ name, email, password });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  authenticated,
  upload.single('avatar'),
  async (request, response) => {
    const {
      user: { id: user_id },
    } = request;
    const userRepository = new UserRepository();
    const updateAvatar = new UpdateAvatarService(userRepository);
    await updateAvatar.execute({
      user_id,
      avatarFileName: request.file.filename,
    });
    return response.json({});
  },
);
export default usersRouter;

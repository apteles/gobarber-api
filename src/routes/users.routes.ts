import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import authenticated from '../middlewares/authenticated';
import uploadConfig from '../config/upload';
import UpdateAvatarService from '../services/UpdateAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const userService = new CreateUserService();
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

    const updateAvatar = new UpdateAvatarService();
    await updateAvatar.execute({
      user_id,
      avatarFileName: request.file.filename,
    });
    return response.json({});
  },
);
export default usersRouter;

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able upload avatar user', async () => {
    const fakeStorage = new FakeStorageProvider();
    const fakeUser = new FakeUserRepository();
    const updateAvatar = new UpdateUserAvatarService(fakeUser, fakeStorage);

    const user = await fakeUser.create({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123456',
    });

    const userWithAvatar = await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    expect(userWithAvatar.avatar).toBe('avatar.png');
  });
  it('should not be able upload avatar with a non existence user', async () => {
    const fakeStorage = new FakeStorageProvider();
    const fakeUser = new FakeUserRepository();
    const updateAvatar = new UpdateUserAvatarService(fakeUser, fakeStorage);

    expect(
      updateAvatar.execute({
        user_id: 'unknown-user',
        avatarFileName: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able update avatar deleting the oldest', async () => {
    const fakeStorage = new FakeStorageProvider();
    const deleteFileSpy = jest.spyOn(fakeStorage, 'deleteFile');
    const fakeUser = new FakeUserRepository();
    const updateAvatar = new UpdateUserAvatarService(fakeUser, fakeStorage);

    const user = await fakeUser.create({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123456',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    const userWithAvatar = await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar-newest.png',
    });

    expect(deleteFileSpy).toHaveBeenCalled();
    expect(userWithAvatar.avatar).toBe('avatar-newest.png');
  });
});

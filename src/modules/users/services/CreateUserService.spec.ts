import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakerUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakerUser = new FakerUsersRepository();
    const fakeCache = new FakeCacheProvider();

    const hashFaker = new FakeHashProvider();
    const createUser = new CreateUserService(fakerUser, hashFaker, fakeCache);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able create user with duplicated email', async () => {
    const fakerUser = new FakerUsersRepository();
    const fakeCache = new FakeCacheProvider();

    const hashFaker = new FakeHashProvider();
    const createUser = new CreateUserService(fakerUser, hashFaker, fakeCache);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@domain.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

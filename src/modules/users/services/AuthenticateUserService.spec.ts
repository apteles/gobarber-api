import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakerUsersRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able authenticate user', async () => {
    const fakerUser = new FakerUsersRepository();
    const hashFaker = new FakeHashProvider();
    const createUser = new CreateUserService(fakerUser, hashFaker);
    const auth = new AuthenticateUserService(fakerUser, hashFaker);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      password: '123456',
    });

    const credentials = await auth.execute({
      email: 'johndoe@domain.com',
      password: '123456',
    });

    expect(credentials.user).toEqual(user);
  });
  it('should not be able authenticate with a non existence user', async () => {
    const fakerUser = new FakerUsersRepository();
    const hashFaker = new FakeHashProvider();
    const auth = new AuthenticateUserService(fakerUser, hashFaker);

    expect(
      auth.execute({
        email: 'unkown@domain.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able authenticate with wrong credentials', async () => {
    const fakerUser = new FakerUsersRepository();
    const hashFaker = new FakeHashProvider();
    const createUser = new CreateUserService(fakerUser, hashFaker);
    const auth = new AuthenticateUserService(fakerUser, hashFaker);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      password: '123456',
    });

    expect(
      auth.execute({
        email: 'johndoe@domain.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

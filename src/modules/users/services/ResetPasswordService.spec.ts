import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;
describe('ResetPasswordService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUserRepository();

    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });
  it('should be able reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123456',
    });
    const { token } = await fakeUserTokenRepository.generate(user.id);
    await resetPassword.execute({
      password: '654321',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('654321');
  });
  it('should not be able reset password if user does not exists', async () => {
    const { token } = await fakeUserTokenRepository.generate('any-id');

    await expect(
      resetPassword.execute({
        password: '654321',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able reset password if token is wrong', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123456',
    });
    await expect(
      resetPassword.execute({
        password: '654321',
        token: 'wrong-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate new password hashed', async () => {
    const generateHashSpy = jest.spyOn(fakeHashProvider, 'generateHash');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123456',
    });
    const { token } = await fakeUserTokenRepository.generate(user.id);
    await resetPassword.execute({
      password: '654321',
      token,
    });
    expect(generateHashSpy).toHaveBeenCalledWith(user.password);
  });

  it('should not be able reset password if limit of 2 hours has been passed', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123456',
    });
    const { token } = await fakeUserTokenRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '654321',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

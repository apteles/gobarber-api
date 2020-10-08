import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ForgotPasswordEmailService from './ForgotPasswordEmailService';

let fakeUsersRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let userFake: User;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: ForgotPasswordEmailService;
describe('ForgotPasswordEmailService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUserRepository();

    userFake = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: '123456',
    });
    fakeUserTokenRepository = new FakeUserTokenRepository();

    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new ForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });
  it('should be able recovery password supplying email', async () => {
    const sendMailSpy = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotPasswordEmail.execute({ email: 'john.doe@domain.com' });

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able recovery password with a non valid email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'non-exists@domain.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forgot password token', async () => {
    const generateSpy = jest.spyOn(fakeUserTokenRepository, 'generate');

    await sendForgotPasswordEmail.execute({ email: 'john.doe@domain.com' });

    expect(generateSpy).toHaveBeenCalledWith(userFake.id);
  });
});

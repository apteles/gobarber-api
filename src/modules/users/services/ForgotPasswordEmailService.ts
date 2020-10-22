import path from 'path';
import MailProviderInterface from '@shared/container/providers/MailProvider/models/MailProviderInterface';
import AppError from '@shared/errors/AppError';
import appConfig from '@config/app';
import { inject, injectable } from 'tsyringe';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';
import UserTokenRepositoryInterface from '../repositories/UserTokenRepositoryInterface';

interface Request {
  email: string;
}

@injectable()
export default class SendForgotEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
    @inject('EtherealMailProvider')
    private mailProvider: MailProviderInterface,
    @inject('UserTokenRepository')
    private userTokenRepository: UserTokenRepositoryInterface,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }
    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      template: {
        view: path.resolve(__dirname, '..', 'views', 'forgot_password.hbs'),
        variables: {
          name: user.name,
          link: `${appConfig.WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

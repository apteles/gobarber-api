/* eslint-disable no-console */
import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import SendMailDTOInterface from '../dtos/SendMailDTOInterface';
import MailProviderInterface from '../models/MailProviderInterface';
import MailTemplateInterface from '../../MailTemplateProvider/models/MailTemplateInterface';

@injectable()
export default class EtherealMailProvider implements MailProviderInterface {
  private client: Transporter;

  constructor(
    @inject('HandlebarsMailTemplate')
    private mailTemplate: MailTemplateInterface,
  ) {
    nodemailer.createTestAccount().then(account => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  async sendMail({
    from,
    to,
    subject,
    template,
  }: SendMailDTOInterface): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Gobarber',
        address: from?.email || 'no-reply@gobarber.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplate.parse(template),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

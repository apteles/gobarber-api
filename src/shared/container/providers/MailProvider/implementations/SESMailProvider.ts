/* eslint-disable no-console */
import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';
import SendMailDTOInterface from '../dtos/SendMailDTOInterface';
import MailProviderInterface from '../models/MailProviderInterface';
import MailTemplateInterface from '../../MailTemplateProvider/models/MailTemplateInterface';

@injectable()
export default class SESMailProvider implements MailProviderInterface {
  private client: Transporter;

  constructor(
    @inject('HandlebarsMailTemplate')
    private mailTemplate: MailTemplateInterface,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-2',
      }),
    });
  }

  async sendMail({
    from,
    to,
    subject,
    template,
  }: SendMailDTOInterface): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || mailConfig.defaults.from.name,
        address: from?.email || mailConfig.defaults.from.address,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplate.parse(template),
    });
  }
}

import MailProviderInterface from '../models/MailProviderInterface';
import SendMailDTOInterface from '../dtos/SendMailDTOInterface';

export default class FakeMailProvider implements MailProviderInterface {
  private messages: SendMailDTOInterface[] = [];

  async sendMail(message: SendMailDTOInterface): Promise<void> {
    this.messages.push(message);
  }
}

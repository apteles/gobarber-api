import SendMailDTOInterface from '../dtos/SendMailDTOInterface';

export default interface MailProviderInterface {
  sendMail(data: SendMailDTOInterface): Promise<void>;
}

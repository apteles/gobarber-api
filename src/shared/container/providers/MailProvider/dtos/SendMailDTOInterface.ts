import ParseTemplateDTOInterface from '@shared/container/providers/MailTemplateProvider/dtos/ParseTemplateDTOInterface';

type MailContact = {
  name: string;
  email: string;
};
export default interface SendMailDTOInterface {
  to: MailContact;
  from?: MailContact;
  subject: string;
  template: ParseTemplateDTOInterface;
}

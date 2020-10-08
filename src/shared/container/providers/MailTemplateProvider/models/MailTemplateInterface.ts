import ParseTemplateDTOInterface from '../dtos/ParseTemplateDTOInterface';

export default interface MailTemplateInterface {
  parse(context: ParseTemplateDTOInterface): Promise<string>;
}

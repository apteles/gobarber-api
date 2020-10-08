import ParseTemplateDTOInterface from '../dtos/ParseTemplateDTOInterface';
import MailTemplateInterface from '../models/MailTemplateInterface';

export default class FakeMailTemplate implements MailTemplateInterface {
  public async parse({ view }: ParseTemplateDTOInterface): Promise<string> {
    return view;
  }
}

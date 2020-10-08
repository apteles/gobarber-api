import fs from 'fs';
import handlebars from 'handlebars';
import ParseTemplateDTOInterface from '../dtos/ParseTemplateDTOInterface';
import MailTemplateInterface from '../models/MailTemplateInterface';

export default class HandlebarsMailTemplate implements MailTemplateInterface {
  public async parse({
    view,
    variables,
  }: ParseTemplateDTOInterface): Promise<string> {
    const contentFile = await fs.promises.readFile(view, { encoding: 'utf-8' });
    const parsedTemplate = handlebars.compile(contentFile);

    return parsedTemplate(variables);
  }
}

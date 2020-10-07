import { container } from 'tsyringe';
import StorageInterface from './StorageProvider/models/StorageInterface';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import MailProviderInterface from './MailProvider/models/MailProviderInterface';
import HandlebarsMailTemplate from './MailTemplateProvider/implementations/HandlebarsMailTemplate';
import MailTemplateInterface from './MailTemplateProvider/models/MailTemplateInterface';

container.registerSingleton<StorageInterface>(
  'DiskStorageProvider',
  DiskStorageProvider,
);

container.registerInstance<MailTemplateInterface>(
  'HandlebarsMailTemplate',
  new HandlebarsMailTemplate(),
);

container.registerInstance<MailProviderInterface>(
  'EtherealMailProvider',
  new EtherealMailProvider(container.resolve('HandlebarsMailTemplate')),
);

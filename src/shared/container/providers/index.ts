import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import appConfig from '@config/app';
import StorageInterface from './StorageProvider/models/StorageInterface';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import MailProviderInterface from './MailProvider/models/MailProviderInterface';
import HandlebarsMailTemplate from './MailTemplateProvider/implementations/HandlebarsMailTemplate';
import MailTemplateInterface from './MailTemplateProvider/models/MailTemplateInterface';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

container.registerSingleton<StorageInterface>(
  'DiskStorageProvider',
  appConfig.storage.driver === 'local'
    ? DiskStorageProvider
    : S3StorageProvider,
);

container.registerInstance<MailTemplateInterface>(
  'HandlebarsMailTemplate',
  new HandlebarsMailTemplate(),
);

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);

import { container } from 'tsyringe';
import StorageInterface from './StorageProvider/models/StorageInterface';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<StorageInterface>(
  'DiskStorageProvider',
  DiskStorageProvider,
);

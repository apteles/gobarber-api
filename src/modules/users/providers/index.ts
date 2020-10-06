import { container } from 'tsyringe';
import HashInterface from './HashProvider/models/HashInterface';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<HashInterface>(
  'BCryptHashProvider',
  BCryptHashProvider,
);
